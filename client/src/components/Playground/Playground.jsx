/** @format */

import React, { useState, useCallback, useRef, useEffect } from "react";
import * as THREE from "three";
import { useParams } from "react-router-dom";
import gui from "../../utils/cameraUtils/debug";
import { setupControls } from "../../utils/cameraUtils/ControlsSetup";
import { setUpRenderer } from "../../utils/cameraUtils/CanvasSetup";
import { setupLights } from "../../utils/cameraUtils/LightsSetup";
import { setUpCamera } from "../../utils/cameraUtils/CameraSetup";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment";
import Customizer from "../Customizer/Customizer";
import "./Playground.css";
import carModels, {
    wheelModels,
    steeringWheelModels,
} from "../Customizer/CarConfig";
import ColorPaletteComponent from "../Customizer/ColorPaletteComponent";
import NotePopup from "../NotePopUp/NotePopup";
function findMeshNodes(object) {
    const meshNodes = [];

    object.traverse((child) => {
        if (child.isMesh) {
            meshNodes.push(child);
        }
    });

    return meshNodes;
}

function getLoader() {
    const loader = new GLTFLoader();
    return loader;
}

const debugObject = {};

function Playground() {
    const { carId } = useParams();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedWheel, setSelectedWheel] = useState(null);
    const [selectedSteeringWheel, setSelectedSteeringWheel] = useState(null);
    const [selectedCarIndex, setSelectedCarIndex] = useState(
        parseInt(carId) || 0
    );
    const [isRunning, setIsRunning] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupContent, setPopupContent] = useState({
        title: "",
        content: "",
    });
    const [data, setData] = useState();
    const sceneRef = useRef(null);
    const canvasRef = useRef(null);
    const cameraRef = useRef(null);
    const controlsRef = useRef(null);
    const rendererRef = useRef(null);
    const modelRef = useRef(null);
    const mixerRef = useRef(null);
    const actionRef = useRef(null);
    const videoRef = useRef(null); // Tham chiếu đến video element
    const [wheelBasePosition] = useState(new THREE.Vector3());
    const addedWheelGroups = useRef([]);

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const openPopup = (title, content) => {
        setPopupContent({ title, content });
        setIsPopupOpen(true);
    };

    const showCarInfo = () => {
        openPopup(
            "Thông tin xe",
            `Tên xe: ${carModels[selectedCarIndex].name}\nMô tả: Thông tin chi tiết về xe\nGiá: Liên hệ để biết thêm chi tiết`
        );
    };

    const animate = useCallback(() => {
        controlsRef.current.update();
        mixerRef.current && mixerRef.current.update(0.01);
        rendererRef.current.render(sceneRef.current, cameraRef.current);
        requestAnimationFrame(animate);
    }, []);

    const handleLoad = (gltf, scene) => {
        const model = gltf.scene;
        modelRef.current = model;

        // Chỉnh lại vị trí của model dựa vào index
        if (selectedCarIndex === 1) {
            // Thu nhỏ scale cho model thứ 2 để tránh bị che khuất bởi UI
            model.scale.set(0.85, 0.85, 0.85);

            // Tính toán kích thước và trung tâm của model
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());

            // Dịch model sang phải nhiều hơn để tránh bị đè bởi UI ở bên trái
            model.position.x = 4.5; // Tăng X để dịch model sang phải
            model.position.y = 0.1;
            model.position.z = 0.25;

            // Điều chỉnh tâm quay sao cho mặc định là mũi xe
            // Đặt offset dương để tâm quay chuyển về phía trước xe (mũi xe)
            model.userData.pivotOffset = new THREE.Vector3(0, 0, 2.5);
            // Lưu vị trí mặc định cho tâm quay - mũi xe
            model.userData.defaultPivotOffset = new THREE.Vector3(0, 0, 2.5);
            // Lưu vị trí tâm quay khi đã chọn tùy chỉnh - trung tâm xe
            model.userData.customizePivotOffset = new THREE.Vector3(0, 0, -1.2);

            // Xoay xe từ phải sang trái như yêu cầu
            model.rotation.y = Math.PI * -0.25; // Negative value rotates to the left

            // Điều chỉnh camera cho model thứ 2 - gần hơn để thấy rõ xe
            controlsRef.current.object.position.set(5.0, 1.2, 3.8);
            controlsRef.current.target.set(4.5, 0.5, 0.25); // Điều chỉnh target theo vị trí model
        } else {
            model.scale.set(1, 1, 1);
            // Vị trí mặc định cho model khác
            model.position.x = 2.0; // Dịch sang phải nhiều hơn để tránh bị đè
            model.position.y = 0.15;
            model.position.z = 0;

            // Điều chỉnh vị trí camera mặc định
            controlsRef.current.object.position.set(3.8, 1.7, 2.2);
            controlsRef.current.target.set(2.0, 0.5, 0); // Điều chỉnh target theo vị trí mới của model
        }

        // Xóa scene cũ nếu có
        while (scene.children.length > 0) {
            scene.remove(scene.children[0]);
        }
        scene.add(model);

        const clip = gltf.animations[0];
        console.log("Animations: ", gltf.animations);
        gltf.animations.forEach((clip, index) => {
            console.log(`Animation ${index}:`, clip);
        });

        // Tạo mixer cho toàn bộ model
        mixerRef.current = new THREE.AnimationMixer(model);

        // Lọc các track không mong muốn
        if (clip) {
            clip.tracks = clip.tracks.filter((track) => {
                return (
                    !track.name.includes("asdasd.quaternion") &&
                    !track.name.includes("Empty001_15.quaternion")
                );
            });

            // Tạo và play action
            actionRef.current = mixerRef.current.clipAction(clip);
            actionRef.current.play();
        }

        gui.add(model.rotation, "y", -Math.PI, Math.PI, 0.001).name("rotation");

        controlsRef.current.update();

        const wheelBaseNode = modelRef.current.getObjectByName("wheel-base");
        if (wheelBaseNode) {
            wheelBaseNode.getWorldPosition(wheelBasePosition);
        } else {
            console.warn("Could not find 'wheel-base' node in the model");
        }

        // Apply additional material enhancements after loading
        if (selectedCarIndex === 1 && modelRef.current) {
            // Model 2 hiện tại quá tối, cần tăng độ sáng
            modelRef.current.traverse((child) => {
                if (child.isMesh && child.material) {
                    if (Array.isArray(child.material)) {
                        child.material.forEach((material) => {
                            // Tăng độ sáng cho model 2
                            if (material.color) {
                                // Tăng saturation để màu hiển thị tươi sáng hơn, không bị xám
                                const color = material.color.clone();
                                // Tăng độ sáng và độ bão hòa màu
                                const hsl = {};
                                color.getHSL(hsl);
                                // Tăng độ sáng và độ bão hòa màu
                                hsl.l = Math.min(hsl.l * 1.4, 0.8); // Tăng độ sáng
                                hsl.s = Math.min(hsl.s * 1.5, 1.0); // Tăng độ bão hòa
                                material.color.setHSL(hsl.h, hsl.s, hsl.l);

                                // Thêm một sự điều chỉnh bổ sung để làm màu tươi hơn
                                material.color.multiplyScalar(1.25);
                            }
                            // Tăng emissive để thêm ánh sáng
                            if (material.emissive) {
                                material.emissive.set(0x222222); // Tăng giá trị emissive
                            }
                            // Tăng specular cho độ bóng
                            if (material.specular) {
                                material.specular.set(0xffffff);
                                material.shininess = 120; // Tăng độ sáng bóng
                            }
                            // Điều chỉnh metalness và roughness để màu hiển thị tươi hơn
                            if (material.metalness !== undefined) {
                                material.metalness = Math.min(
                                    material.metalness * 1.2,
                                    0.85
                                );
                                material.roughness = Math.max(
                                    material.roughness * 0.7,
                                    0.1
                                ); // Giảm roughness để màu tươi hơn
                            }
                            material.needsUpdate = true;
                        });
                    } else {
                        // Tăng độ sáng cho model 2
                        if (child.material.color) {
                            // Tăng saturation để màu hiển thị tươi sáng hơn, không bị xám
                            const color = child.material.color.clone();
                            // Tăng độ sáng và độ bão hòa màu
                            const hsl = {};
                            color.getHSL(hsl);
                            // Tăng độ sáng và độ bão hòa màu
                            hsl.l = Math.min(hsl.l * 1.4, 0.8); // Tăng độ sáng
                            hsl.s = Math.min(hsl.s * 1.5, 1.0); // Tăng độ bão hòa
                            child.material.color.setHSL(hsl.h, hsl.s, hsl.l);

                            // Thêm một sự điều chỉnh bổ sung để làm màu tươi hơn
                            child.material.color.multiplyScalar(1.25);
                        }
                        // Tăng emissive để thêm ánh sáng
                        if (child.material.emissive) {
                            child.material.emissive.set(0x222222); // Tăng giá trị emissive
                        }
                        // Tăng specular cho độ bóng
                        if (child.material.specular) {
                            child.material.specular.set(0xffffff);
                            child.material.shininess = 120; // Tăng độ sáng bóng
                        }
                        // Điều chỉnh metalness và roughness để màu hiển thị tươi hơn
                        if (child.material.metalness !== undefined) {
                            child.material.metalness = Math.min(
                                child.material.metalness * 1.2,
                                0.85
                            );
                            child.material.roughness = Math.max(
                                child.material.roughness * 0.7,
                                0.1
                            ); // Giảm roughness để màu tươi hơn
                        }
                        child.material.needsUpdate = true;
                    }
                }
            });
        } else if (selectedCarIndex === 0 && modelRef.current) {
            // Model 1 hiện tại quá tối, cần tăng độ sáng
            modelRef.current.traverse((child) => {
                if (child.isMesh && child.material) {
                    if (Array.isArray(child.material)) {
                        child.material.forEach((material) => {
                            // Tăng độ sáng màu cho model 1
                            if (material.color) {
                                // Tăng độ sáng và độ bão hòa của màu đỏ
                                const color = material.color.clone();
                                // Tăng kênh đỏ nhiều hơn
                                material.color.setRGB(
                                    Math.min(color.r * 1.2, 1.0), // Giảm kênh đỏ xuống một chút
                                    Math.min(color.g * 0.8, 1.0), // Giảm kênh xanh lá
                                    Math.min(color.b * 0.8, 1.0) // Giảm kênh xanh dương
                                );
                            }
                            // Tăng emissive để thêm ánh sáng
                            if (material.emissive) {
                                material.emissive.set(0x330000); // Thêm ánh sáng đỏ nhẹ
                            }
                            // Giảm metallness và roughness để màu đỏ rõ hơn
                            if (material.metalness !== undefined) {
                                material.metalness = Math.min(
                                    material.metalness * 0.9,
                                    0.8
                                );
                                material.roughness = Math.max(
                                    material.roughness * 0.7,
                                    0.15
                                );
                            }
                            material.needsUpdate = true;
                        });
                    } else {
                        // Tăng độ sáng màu cho model 1
                        if (child.material.color) {
                            // Tăng độ sáng và độ bão hòa của màu đỏ
                            const color = child.material.color.clone();
                            // Tăng kênh đỏ nhiều hơn
                            child.material.color.setRGB(
                                Math.min(color.r * 1.35, 1.0), // Giảm kênh đỏ xuống một chút
                                Math.min(color.g * 0.8, 1.0), // Giảm kênh xanh lá
                                Math.min(color.b * 0.8, 1.0) // Giảm kênh xanh dương
                            );
                        }
                        // Tăng emissive để thêm ánh sáng
                        if (child.material.emissive) {
                            child.material.emissive.set(0x330000); // Thêm ánh sáng đỏ nhẹ
                        }
                        // Giảm metallness và roughness để màu đỏ rõ hơn
                        if (child.material.metalness !== undefined) {
                            child.material.metalness = Math.min(
                                child.material.metalness * 0.9,
                                0.8
                            );
                            child.material.roughness = Math.max(
                                child.material.roughness * 0.7,
                                0.15
                            );
                        }
                        child.material.needsUpdate = true;
                    }
                }
            });
        }
    };

    function setColorIndex(index) {
        setSelectedIndex(index);

        // Hiển thị popup thông tin về màu sắc đã chọn
        const colorConfig = carModels[selectedCarIndex].colorConfigs[index];
        if (colorConfig) {
            openPopup(
                `Đã chọn: ${colorConfig.title}`,
                `Bạn đã chọn tùy chỉnh cho ${colorConfig.title.toLowerCase()}.
Các màu có sẵn: ${colorConfig.colors.length} màu
Vị trí: ${colorConfig.types.join(", ")}`
            );
        }
    }

    const changeWheel = useCallback(
        (wheelId) => {
            setSelectedWheel(wheelId);

            // Hiển thị popup thông tin về bánh xe đã chọn
            const wheelModel = wheelModels.find(
                (wheel) => wheel.id === wheelId
            );
            if (wheelModel) {
                openPopup(
                    "Thay đổi bánh xe",
                    `Bạn đã chọn mẫu bánh xe: ${wheelModel.name || wheelId}
Kích thước: ${wheelModel.size || "Tiêu chuẩn"}
Kiểu dáng: ${wheelModel.style || "Thể thao"}`
                );
            }

            // Xóa rim xe mặc định của model
            modelRef.current.traverse((child) => {
                if (child.isMesh) {
                    if (selectedCarIndex === 1) {
                        // Cho model 2
                        if (child.name.toLowerCase().includes("g_rim_")) {
                            if (child.parent) {
                                if (child.material) {
                                    if (Array.isArray(child.material)) {
                                        child.material.forEach((mat) =>
                                            mat.dispose()
                                        );
                                    } else {
                                        child.material.dispose();
                                    }
                                }
                                if (child.geometry) child.geometry.dispose();
                                child.parent.remove(child);
                            }
                        }
                    } else {
                        // Cho model 1
                        if (
                            child.name.toLowerCase().includes("rim") &&
                            !child.name.toLowerCase().includes("steering")
                        ) {
                            if (child.parent) {
                                if (child.material) {
                                    if (Array.isArray(child.material)) {
                                        child.material.forEach((mat) =>
                                            mat.dispose()
                                        );
                                    } else {
                                        child.material.dispose();
                                    }
                                }
                                if (child.geometry) child.geometry.dispose();
                                child.parent.remove(child);
                            }
                        }
                    }
                }
            });

            // Xóa các rim xe đã thêm trước đó
            if (addedWheelGroups.current.length > 0) {
                addedWheelGroups.current.forEach((group) => {
                    if (group && group.parent) {
                        group.traverse((child) => {
                            if (child.isMesh) {
                                if (child.material) {
                                    if (Array.isArray(child.material)) {
                                        child.material.forEach((mat) =>
                                            mat.dispose()
                                        );
                                    } else {
                                        child.material.dispose();
                                    }
                                }
                                if (child.geometry) child.geometry.dispose();
                            }
                        });
                        group.parent.remove(group);
                    }
                });
                addedWheelGroups.current = [];
            }

            // Thêm rim xe mới
            const selectedWheelModel = wheelModels.find(
                (wheel) => wheel.id === wheelId
            );
            if (!selectedWheelModel) return;

            const loader = new GLTFLoader();
            loader.load(selectedWheelModel.src, (gltf) => {
                const wheelMeshNodes = findMeshNodes(gltf.scene);

                let wheelPositions;
                if (selectedCarIndex === 1) {
                    wheelPositions = [
                        [0.86, 0.31851, 1.20457],
                        [-0.86, 0.31851, 1.20457],
                        [0.86, 0.33225, -1.41953],
                        [-0.86, 0.33225, -1.41953],
                    ];
                } else {
                    // Giữ nguyên vị trí cho model 1
                    wheelPositions = [
                        [0.85, 0.35, 1.35],
                        [-0.85, 0.35, 1.35],
                        [0.9, 0.35, -1.2],
                        [-0.9, 0.35, -1.2],
                    ];
                }

                wheelPositions.forEach((position, index) => {
                    const wheelGroup = new THREE.Group();
                    wheelGroup.name = `wheel-group-${index}`;

                    wheelMeshNodes.forEach((node, meshIndex) => {
                        const clonedNode = node.clone();

                        const boundingBox = new THREE.Box3().setFromObject(
                            clonedNode
                        );
                        const size = boundingBox.getSize(new THREE.Vector3());
                        const maxDimension = Math.max(size.x, size.y, size.z);
                        const targetSize = 1;
                        const scaleFactor = targetSize / maxDimension;

                        // Điều chỉnh tỷ lệ bánh xe dựa trên model
                        const wheelScale = 0.55;
                        clonedNode.scale.set(
                            scaleFactor * wheelScale,
                            scaleFactor * wheelScale,
                            scaleFactor * wheelScale
                        );

                        clonedNode.rotation.x = selectedWheelModel.rotation.x;
                        clonedNode.rotation.y = selectedWheelModel.rotation.y;
                        clonedNode.rotation.z = selectedWheelModel.rotation.z;

                        if (clonedNode.material) {
                            clonedNode.material = clonedNode.material.clone();
                            clonedNode.material.needsUpdate = true;
                        }

                        clonedNode.name = `wheel-${index}`;
                        wheelGroup.add(clonedNode);
                    });

                    wheelGroup.position.set(
                        position[0],
                        position[1],
                        position[2]
                    );

                    if (index === 1 || index === 3) {
                        wheelGroup.rotation.y = Math.PI;
                    }

                    modelRef.current.add(wheelGroup);
                    // Thêm wheelGroup vào danh sách theo dõi
                    addedWheelGroups.current.push(wheelGroup);
                });
            });
        },
        [modelRef, selectedCarIndex]
    );

    const changeSteeringWheel = useCallback(
        (steeringWheelId) => {
            setSelectedSteeringWheel(steeringWheelId);

            // Hiển thị popup thông tin về vô lăng đã chọn
            const steeringModel = steeringWheelModels.find(
                (wheel) => wheel.id === steeringWheelId
            );
            if (steeringModel) {
                openPopup(
                    "Thay đổi vô lăng",
                    `Bạn đã chọn kiểu vô lăng: ${
                        steeringModel.name || steeringWheelId
                    }
Chất liệu: ${steeringModel.material || "Da cao cấp"}
Thiết kế: ${steeringModel.design || "Hiện đại"}`
                );
            }

            const selectedSteeringWheelModel = steeringWheelModels.find(
                (wheel) => wheel.id === steeringWheelId
            );
            if (!selectedSteeringWheelModel) return;

            const loader = new GLTFLoader();
            loader.load(selectedSteeringWheelModel.src, (gltf) => {
                const steeringWheelMeshNodes = findMeshNodes(gltf.scene);

                const existingSteeringWheelNodes = [];
                modelRef.current.traverse((child) => {
                    if (
                        (child.isMesh &&
                            child.name
                                .toLowerCase()
                                .includes("steering-wheel")) ||
                        child.name.toLowerCase().includes("steering-handle")
                    ) {
                        existingSteeringWheelNodes.push(child);
                    }
                });

                existingSteeringWheelNodes.forEach((node) => {
                    console.log(
                        "Removing existing steering wheel node:",
                        node.name
                    );
                    node.parent.remove(node);
                });

                // Vị trí của steering wheel
                const steeringWheelPosition = {
                    x: 0.355,
                    y: 0.75,
                    z: 0.05,
                };

                // Thay thế steering wheel với rotation và vị trí mới
                steeringWheelMeshNodes.forEach((node) => {
                    const clonedNode = node.clone();

                    const boundingBox = new THREE.Box3().setFromObject(
                        clonedNode
                    );
                    const size = boundingBox.getSize(new THREE.Vector3());
                    const maxDimension = Math.max(size.x, size.y, size.z);
                    const targetSize = 1;
                    const scaleFactor = targetSize / maxDimension;

                    clonedNode.scale.set(
                        scaleFactor * 0.55,
                        scaleFactor * 0.55,
                        scaleFactor * 0.55
                    );
                    clonedNode.rotation.x =
                        selectedSteeringWheelModel.rotation.x;
                    clonedNode.rotation.y =
                        selectedSteeringWheelModel.rotation.y;
                    clonedNode.rotation.z =
                        selectedSteeringWheelModel.rotation.z;

                    if (clonedNode.material) {
                        clonedNode.material = clonedNode.material.clone();
                        clonedNode.material.needsUpdate = true;
                    }

                    clonedNode.name = `steering-wheel`;
                    clonedNode.position.set(
                        steeringWheelPosition.x,
                        steeringWheelPosition.y,
                        steeringWheelPosition.z
                    );

                    modelRef.current.add(clonedNode);

                    console.log("Steering Wheel Replacement:", clonedNode);
                });
            });
        },
        [modelRef, sceneRef]
    );

    useEffect(() => {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color("rgb(f,f,f,0.1)");
        sceneRef.current = scene;

        const loader = getLoader();
        if (sceneRef.current && carModels[selectedCarIndex]) {
            const modelUrl = carModels[selectedCarIndex].modelUrl;
            console.log("Loading model from:", modelUrl);

            loader.load(
                modelUrl,
                (gltf) => {
                    console.log("Model loaded successfully");
                    handleLoad(gltf, sceneRef.current);
                },
                (progress) => {
                    console.log(
                        "Loading progress:",
                        (progress.loaded / progress.total) * 100 + "%"
                    );
                },
                (error) => {
                    console.error("Error loading model:", error);
                    console.error("Model URL that failed:", modelUrl);
                }
            );
        }

        cameraRef.current = setUpCamera(canvasRef);
        setupLights(sceneRef.current);

        // Enhanced renderer settings
        rendererRef.current = setUpRenderer(canvasRef);
        if (rendererRef.current) {
            rendererRef.current.physicallyCorrectLights = true;
            rendererRef.current.outputEncoding = THREE.sRGBEncoding;
            rendererRef.current.toneMapping = THREE.ACESFilmicToneMapping;
            rendererRef.current.toneMappingExposure =
                selectedCarIndex === 0 ? 1.7 : 1.9;
            rendererRef.current.shadowMap.enabled = true;
            rendererRef.current.shadowMap.type = THREE.PCFSoftShadowMap;
        }

        controlsRef.current = setupControls(cameraRef.current, canvasRef);
        const pmremGenerator = new THREE.PMREMGenerator(rendererRef.current);
        pmremGenerator.compileEquirectangularShader();

        sceneRef.current.environment = pmremGenerator.fromScene(
            new RoomEnvironment(),
            selectedCarIndex === 1 ? 1.5 : 1
        ).texture;

        const environmentMap = new THREE.CubeTextureLoader().load([
            "/texture/environmentMaps/px.jpg",
            "/texture/environmentMaps/nx.jpg",
            "/texture/environmentMaps/py.jpg",
            "/texture/environmentMaps/ny.jpg",
            "/texture/environmentMaps/pz.jpg",
            "/texture/environmentMaps/nz.jpg",
        ]);

        environmentMap.encoding = THREE.sRGBEncoding;
        sceneRef.current.environment = environmentMap;

        // Đồng bộ cài đặt cường độ môi trường cho cả hai mô hình
        debugObject.envMapIntensity = selectedCarIndex === 1 ? 2.2 : 1.8;

        // Áp dụng cài đặt vật liệu thống nhất cho cả hai mô hình dựa trên mô hình
        sceneRef.current.traverse((child) => {
            if (child.isMesh && child.material) {
                if (Array.isArray(child.material)) {
                    child.material.forEach((material) => {
                        // Thiết lập cường độ phản xạ môi trường
                        if (material.envMap) {
                            material.envMapIntensity =
                                debugObject.envMapIntensity;
                        }

                        // Điều chỉnh độ kim loại (metalness) dựa trên model
                        if (material.metalness !== undefined) {
                            if (selectedCarIndex === 0) {
                                // Model 1: giảm metalness để giảm độ phản chiếu vì đang quá sáng
                                material.metalness = Math.min(
                                    material.metalness * 0.6,
                                    0.7
                                );
                                material.roughness = Math.max(
                                    material.roughness * 1.5,
                                    0.2
                                );
                            } else {
                                // Model 2: điều chỉnh để màu tươi sáng hơn, không bị xám
                                material.metalness = Math.min(
                                    material.metalness * 1.2,
                                    0.85
                                );
                                material.roughness = Math.max(
                                    material.roughness * 0.6,
                                    0.1
                                );
                            }
                        }

                        // Điều chỉnh màu sắc của vật liệu
                        if (material.color) {
                            if (selectedCarIndex === 0) {
                                // Model 1: tăng độ sáng màu đỏ
                                const color = material.color.clone();
                                material.color.setRGB(
                                    Math.min(color.r * 1.35, 1.0), // Giảm kênh đỏ xuống một chút
                                    Math.min(color.g * 0.8, 1.0), // Giảm kênh xanh lá
                                    Math.min(color.b * 0.8, 1.0) // Giảm kênh xanh dương
                                );
                            } else {
                                // Model 2: tăng độ sáng và độ bão hòa để màu không bị xám
                                const color = material.color.clone();
                                const hsl = {};
                                color.getHSL(hsl);
                                // Tăng độ sáng và độ bão hòa
                                hsl.l = Math.min(hsl.l * 1.35, 0.8); // Tăng độ sáng
                                hsl.s = Math.min(hsl.s * 1.5, 1.0); // Tăng độ bão hòa để màu tươi hơn
                                material.color.setHSL(hsl.h, hsl.s, hsl.l);

                                // Thêm điều chỉnh bổ sung nếu màu quá tối
                                if (hsl.l < 0.4) {
                                    material.color.multiplyScalar(1.3);
                                }
                            }
                        }

                        // Cài đặt phát sáng cho model 2
                        if (selectedCarIndex === 1 && material.emissive) {
                            material.emissive.set(0x222222); // Thêm phát sáng nhẹ để màu tươi hơn
                        }

                        // Đặt chế độ shadow
                        child.castShadow = true;
                        child.receiveShadow = true;

                        material.needsUpdate = true;
                    });
                } else {
                    // Thiết lập cường độ phản xạ môi trường
                    if (child.material.envMap) {
                        child.material.envMapIntensity =
                            debugObject.envMapIntensity;
                    }

                    // Điều chỉnh độ kim loại (metalness) dựa trên model
                    if (child.material.metalness !== undefined) {
                        if (selectedCarIndex === 0) {
                            // Model 1: giảm metalness để giảm độ phản chiếu vì đang quá sáng
                            child.material.metalness = Math.min(
                                child.material.metalness * 0.6,
                                0.7
                            );
                            child.material.roughness = Math.max(
                                child.material.roughness * 1.5,
                                0.2
                            );
                        } else {
                            // Model 2: điều chỉnh để màu tươi sáng hơn, không bị xám
                            child.material.metalness = Math.min(
                                child.material.metalness * 1.2,
                                0.85
                            );
                            child.material.roughness = Math.max(
                                child.material.roughness * 0.6,
                                0.1
                            );
                        }
                    }

                    // Điều chỉnh màu sắc của vật liệu
                    if (child.material.color) {
                        if (selectedCarIndex === 0) {
                            // Model 1: tăng độ sáng màu đỏ
                            const color = child.material.color.clone();
                            child.material.color.setRGB(
                                Math.min(color.r * 1.35, 1.0), // Giảm kênh đỏ xuống một chút
                                Math.min(color.g * 0.8, 1.0), // Giảm kênh xanh lá
                                Math.min(color.b * 0.8, 1.0) // Giảm kênh xanh dương
                            );
                        } else {
                            // Model 2: tăng độ sáng và độ bão hòa để màu không bị xám
                            const color = child.material.color.clone();
                            const hsl = {};
                            color.getHSL(hsl);
                            // Tăng độ sáng và độ bão hòa
                            hsl.l = Math.min(hsl.l * 1.35, 0.8); // Tăng độ sáng
                            hsl.s = Math.min(hsl.s * 1.5, 1.0); // Tăng độ bão hòa để màu tươi hơn
                            child.material.color.setHSL(hsl.h, hsl.s, hsl.l);

                            // Thêm điều chỉnh bổ sung nếu màu quá tối
                            if (hsl.l < 0.4) {
                                child.material.color.multiplyScalar(1.3);
                            }
                        }
                    }

                    // Cài đặt phát sáng cho model 2
                    if (selectedCarIndex === 1 && child.material.emissive) {
                        child.material.emissive.set(0x222222); // Thêm phát sáng nhẹ để màu tươi hơn
                    }

                    // Đặt chế độ shadow
                    child.castShadow = true;
                    child.receiveShadow = true;

                    child.material.needsUpdate = true;
                }
            }
        });

        window.addEventListener("resize", () => {
            resize(rendererRef, cameraRef);
        });

        animate();

        return () => {
            window.removeEventListener("resize", () =>
                resize(rendererRef, cameraRef)
            );
            // Clean up Three.js resources
            if (sceneRef.current) {
                sceneRef.current.traverse((object) => {
                    if (object.geometry) {
                        object.geometry.dispose();
                    }
                    if (object.material) {
                        if (Array.isArray(object.material)) {
                            object.material.forEach((material) =>
                                material.dispose()
                            );
                        } else {
                            object.material.dispose();
                        }
                    }
                });
            }
            if (rendererRef.current) {
                rendererRef.current.dispose();
            }
        };
    }, [animate, selectedCarIndex]);

    function resize(renderer, cameraRef) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        renderer.current.setSize(window.innerWidth, window.innerHeight);
        renderer.current.setPixelRatio(2);
    }

    return (
        <div className="app">
            <div className="header">
                {/* <div className="title">{carModels[selectedCarIndex].name}</div> */}
                <select
                    value={selectedCarIndex}
                    onChange={(e) =>
                        setSelectedCarIndex(parseInt(e.target.value))
                    }>
                    {carModels.map((model, index) => (
                        <option key={model.id} value={index}>
                            {model.name}
                        </option>
                    ))}
                </select>
                <button className="info-button" onClick={showCarInfo}>
                    Hiển thị thông tin
                </button>
            </div>
            <div className="flex-container">
                <div className="car-region">
                    <canvas
                        ref={canvasRef}
                        className="webgl"
                        style={{ zIndex: "2", position: "relative" }}></canvas>
                    <NotePopup
                        isOpen={isPopupOpen}
                        onClose={closePopup}
                        title={popupContent.title}
                        content={popupContent.content}
                    />
                    <div className="color-palate">
                        <ColorPaletteComponent
                            selectedIndex={selectedIndex}
                            selectedCarIndex={selectedCarIndex}
                            modelRef={modelRef}
                        />
                    </div>
                </div>

                <div className="side-container">
                    <Customizer
                        selectedCarIndex={selectedCarIndex}
                        modelRef={modelRef}
                        cameraRef={cameraRef}
                        controlsRef={controlsRef}
                        canvasRef={canvasRef}
                        rendererRef={rendererRef}
                        actionRef={actionRef}
                        sceneRef={sceneRef}
                        setColorIndex={setColorIndex}
                        changeWheel={changeWheel}
                        changeSteeringWheel={changeSteeringWheel}
                    />
                </div>
            </div>
        </div>
    );
}

export default Playground;
