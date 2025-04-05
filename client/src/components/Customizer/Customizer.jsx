/** @format */

import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import "./Customizer.css";
import { carModels, wheelModels, steeringWheelModels } from "./CarConfig";
import gsap from "gsap";
import ListCards from "../ListCards/ListCards";
import NotePopup from "../NotePopUp/NotePopup";
import * as THREE from "three";
import { download, blinkAnimation } from "./customizeUtils";

const Customizer = ({
  modelRef,
  controlsRef,
  rendererRef,
  selectedCarIndex,
  actionRef,
  sceneRef,
  setColorIndex,
  changeWheel,
  changeSteeringWheel,
}) => {
  const [selectedWheel, setSelectedWheel] = useState(null);
  const [selectedSteeringWheel, setSelectedSteeringWheel] = useState(null);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState({ title: "", content: "" });
  const [videoElement, setVideoElement] = useState(null);

  const onChange = useCallback(
    (index) => {
      setColorIndex(index);
      const position =
        carModels[selectedCarIndex].colorConfigs[index].modelPosition;

      // Add adjustment for model 2 to fix positioning issues
      let adjustedPosition = { ...position };
      if (selectedCarIndex === 1) {
        // Apply position corrections for model 2 based on part type
        const partTypes = carModels[selectedCarIndex].colorConfigs[index].types;
        const partTitle = carModels[selectedCarIndex].colorConfigs[index].title;

        // Khi đã chọn một tùy chỉnh, chuyển tâm quay về trung tâm xe
        if (
          modelRef.current &&
          modelRef.current.userData.customizePivotOffset
        ) {
          modelRef.current.userData.pivotOffset =
            modelRef.current.userData.customizePivotOffset.clone();
        }

        // Adjust camera position based on part type
        if (partTitle.includes("Thân xe") || partTitle.includes("Paint")) {
          // Better position for viewing car body/paint - farther away for full car view
          adjustedPosition = {
            x: 6.5, // Đặt xa hơn theo trục X
            y: 1.9, // Đặt cao hơn một chút để nhìn xuống
            z: 5.0, // Đặt xa hơn theo trục Z để nhìn thấy toàn bộ xe
          };

          // Điều chỉnh target khi xem thân xe, cần nhắm vào giữa xe
          gsap.to(controlsRef.current.target, {
            x: 4.5, // Trỏ vào vị trí X của xe
            y: 0.5, // Trỏ vào giữa chiều cao xe
            z: 0.25, // Trỏ vào vị trí Z của xe
            duration: 1,
            ease: "power3.inOut",
          });

          return; // Skip further target adjustments
        } else if (partTitle.includes("Lốp") || partTitle.includes("Tyre")) {
          // Vị trí xem lốp xe - cần nhìn gần và thấp hơn
          adjustedPosition = {
            x: 5.5,
            y: 0.6, // Thấp hơn để nhìn lốp xe
            z: 2.5,
          };

          // Điều chỉnh target để nhìn vào lốp
          gsap.to(controlsRef.current.target, {
            x: 4.3, // Trỏ vào vị trí X của bánh xe
            y: 0.3, // Trỏ thấp hơn, vào lốp xe
            z: 0.8, // Trỏ vào vị trí Z của bánh xe trước
            duration: 1,
            ease: "power3.inOut",
          });

          return;
        } else if (partTitle.includes("Vành") || partTitle.includes("Rim")) {
          // Vị trí xem vành xe - gần và nhìn nghiêng
          adjustedPosition = {
            x: 5.8,
            y: 0.7,
            z: 2.0,
          };

          // Điều chỉnh target để nhìn vào vành
          gsap.to(controlsRef.current.target, {
            x: 4.3, // Trỏ vào vị trí X của bánh xe
            y: 0.3, // Trỏ thấp hơn, vào bánh xe
            z: 0.8, // Trỏ vào vị trí Z của bánh xe trước
            duration: 1,
            ease: "power3.inOut",
          });

          return;
        } else if (
          partTitle.includes("Kính") ||
          partTypes.some(
            (type) =>
              type.toLowerCase().includes("glass") ||
              type.toLowerCase().includes("vetro")
          )
        ) {
          // Vị trí xem kính xe - cao hơn và nhìn xuống
          adjustedPosition = {
            x: 5.8,
            y: 2.5, // Cao hơn để nhìn xuống kính
            z: 2.8,
          };

          // Điều chỉnh target để nhìn vào kính
          gsap.to(controlsRef.current.target, {
            x: 4.6, // Trỏ vào vị trí X của khoang lái
            y: 1.1, // Trỏ cao hơn, vào kính
            z: 0.3, // Trỏ vào vị trí Z của khoang lái
            duration: 1,
            ease: "power3.inOut",
          });

          return;
        } else {
          // General adjustment for other parts
          adjustedPosition = {
            x: 6.0,
            y: 1.5,
            z: 3.2,
          };

          // Điều chỉnh target mặc định
          gsap.to(controlsRef.current.target, {
            x: 4.6,
            y: 0.8,
            z: 0.3,
            duration: 1,
            ease: "power3.inOut",
          });

          return;
        }
      }

      // Animate camera to the adjusted position
      gsap.to(controlsRef.current.object.position, {
        ...adjustedPosition,
        duration: 1,
        ease: "power3.inOut",
      });

      // Ensure the camera is looking at the correct target point
      if (selectedCarIndex === 1) {
        // Update the orbit controls target to focus better on the part
        gsap.to(controlsRef.current.target, {
          x: position.x - 1,
          y: position.y,
          z: position.z - 0.5,
          duration: 1,
          ease: "power3.inOut",
        });
      }

      carModels[selectedCarIndex].colorConfigs[index].types.forEach((type) => {
        blinkAnimation(type, modelRef);
      });
    },
    [modelRef, controlsRef, selectedCarIndex, setColorIndex]
  );

  const selectWheel = (wheelId) => {
    setSelectedWheel(wheelId);
    changeWheel(wheelId);
    setPopupContent({
      title: "Selected Wheel",
      content: `You have selected ${wheelId}`,
    });
    setIsPopupOpen(true);
  };

  const selectSteeringWheel = (steeringWheelId) => {
    setSelectedSteeringWheel(steeringWheelId);
    changeSteeringWheel(steeringWheelId);
    setPopupContent({
      title: "Selected Steering Wheel",
      content: `You have selected ${steeringWheelId}`,
    });
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const selectType = useCallback(
    (index) => {
      if (!carModels[selectedCarIndex].colorConfigs[index]) {
        console.error("Không tìm thấy mục tương ứng trong cấu hình");
        return;
      }
      onChange(index);
      const selectedItem = carModels[selectedCarIndex].colorConfigs[index];
      setPopupContent({
        title: selectedItem.title,
        content: `Colors: ${selectedItem.colors.join(
          ", "
        )} Types: ${selectedItem.types.join(", ")}`,
      });
      setIsPopupOpen(true);
    },
    [onChange, selectedCarIndex]
  );

  const rotateModel = useCallback(() => {
    // Xử lý tâm quay dựa trên pivotOffset nếu có
    let rotationAnimation;

    if (selectedCarIndex === 1 && modelRef.current.userData.pivotOffset) {
      // Lưu vị trí ban đầu
      const originalPosition = modelRef.current.position.clone();
      const pivotOffset = modelRef.current.userData.pivotOffset;

      // Tạo timeline để điều phối các animation
      const timeline = gsap.timeline({
        onComplete: () => {
          if (selectedCarIndex === 1) {
            controlsRef.current.object.position.set(-10, 5, 5);

            // Tạo container cho video
            const videoContainer = document.createElement("div");
            videoContainer.style.position = "fixed";
            videoContainer.style.top = "0";
            videoContainer.style.left = "0";
            videoContainer.style.width = "100%";
            videoContainer.style.height = "100%";
            videoContainer.style.backgroundColor = "rgba(0,0,0,0.7)";
            videoContainer.style.zIndex = "2";
            videoContainer.style.display = "flex";
            videoContainer.style.justifyContent = "center";
            videoContainer.style.alignItems = "center";

            const video = document.createElement("video");
            video.src =
              "/video/stock-footage-animation-road-with-asphalt-loop-endless-road-animation-animated-road-for-the-movement-of-vehicles.mp4";
            video.style.width = "80%";
            video.style.maxHeight = "80vh";
            video.style.objectFit = "contain";

            // Thêm các thuộc tính video
            video.autoplay = true;
            video.muted = true;
            video.playsInline = true;
            video.controls = true; // Thêm controls để dễ debug

            // Thêm event listeners
            video.addEventListener("loadeddata", () => {
              console.log("Video loaded successfully");
            });

            video.addEventListener("error", (e) => {
              console.error("Error loading video:", e);
            });

            // Thêm video vào container
            videoContainer.appendChild(video);
            document.body.appendChild(videoContainer);
            setVideoElement(videoContainer); // Lưu container thay vì video
          } else {
            controlsRef.current.object.position.set(
              3.2721405209559538,
              1.9869284325362329,
              1.7718614102150416
            );
            actionRef.current.play();
          }
        },
      });

      // Tịnh tiến mô hình để tâm quay nằm ở gốc tọa độ
      timeline.to(modelRef.current.position, {
        x: originalPosition.x + pivotOffset.x,
        y: originalPosition.y + pivotOffset.y,
        z: originalPosition.z + pivotOffset.z,
        duration: 0,
        ease: "none",
      });

      // Xoay mô hình
      timeline.to(modelRef.current.rotation, {
        y: Math.PI * 2,
        duration: 0.8,
        ease: "power1.inOut",
      });

      // Trả mô hình về vị trí ban đầu
      timeline.to(modelRef.current.position, {
        x: originalPosition.x,
        y: originalPosition.y,
        z: originalPosition.z,
        duration: 0,
        ease: "none",
      });

      rotationAnimation = timeline;
    } else {
      // Mô hình thứ nhất xử lý như bình thường
      rotationAnimation = gsap.to(modelRef.current.rotation, {
        y: Math.PI * 2,
        duration: 0.8,
        ease: "power1.inOut",
        onComplete: () => {
          if (selectedCarIndex === 1) {
            controlsRef.current.object.position.set(-10, 5, 5);

            // Tạo container cho video
            const videoContainer = document.createElement("div");
            videoContainer.style.position = "fixed";
            videoContainer.style.top = "0";
            videoContainer.style.left = "0";
            videoContainer.style.width = "100%";
            videoContainer.style.height = "100%";
            videoContainer.style.backgroundColor = "rgba(0,0,0,0.7)";
            videoContainer.style.zIndex = "2";
            videoContainer.style.display = "flex";
            videoContainer.style.justifyContent = "center";
            videoContainer.style.alignItems = "center";

            const video = document.createElement("video");
            video.src =
              "/video/stock-footage-animation-road-with-asphalt-loop-endless-road-animation-animated-road-for-the-movement-of-vehicles.mp4";
            video.style.width = "80%";
            video.style.maxHeight = "80vh";
            video.style.objectFit = "contain";

            // Thêm các thuộc tính video
            video.autoplay = true;
            video.muted = true;
            video.playsInline = true;
            video.controls = true; // Thêm controls để dễ debug

            // Thêm event listeners
            video.addEventListener("loadeddata", () => {
              console.log("Video loaded successfully");
            });

            video.addEventListener("error", (e) => {
              console.error("Error loading video:", e);
            });

            // Thêm video vào container
            videoContainer.appendChild(video);
            document.body.appendChild(videoContainer);
            setVideoElement(videoContainer); // Lưu container thay vì video
          } else {
            controlsRef.current.object.position.set(
              3.2721405209559538,
              1.9869284325362329,
              1.7718614102150416
            );
            actionRef.current.play();
          }
        },
      });
    }

    // Quay bánh xe liên tục nếu là model thứ 2
    let wheelAnimation;
    if (selectedCarIndex === 1) {
      const wheels = [];
      modelRef.current.traverse((child) => {
        if (
          child.isMesh &&
          child.name.toLowerCase().includes("rim") &&
          !child.name.toLowerCase().includes("steering")
        ) {
          wheels.push(child.parent);
        }
      });

      if (wheels.length > 0) {
        // Quay bánh xe liên tục
        wheelAnimation = gsap.to(
          wheels.map((wheel) => wheel.rotation),
          {
            x: "+=6.28", // Quay đúng 360° (2 * Math.PI)
            duration: 0.8, // Quay nhanh hơn một chút so với xe
            ease: "none", // Không bị giật
            repeat: -1, // Quay vô hạn
          }
        );
      }
    }

    // Lưu animation vào userData
    modelRef.current.userData.carAnimation = rotationAnimation;
    modelRef.current.userData.wheelAnimation = wheelAnimation || null;
  }, [modelRef, controlsRef, actionRef, selectedCarIndex]);

  const stopModel = useCallback(() => {
    // Dừng quay xe
    gsap.killTweensOf(modelRef.current.rotation);

    // Đặt lại tâm quay về vị trí mặc định (mũi xe) nếu là model thứ 2
    if (
      selectedCarIndex === 1 &&
      modelRef.current.userData.defaultPivotOffset
    ) {
      modelRef.current.userData.pivotOffset =
        modelRef.current.userData.defaultPivotOffset.clone();
    }

    // Dừng tất cả bánh xe
    const wheels = [];
    modelRef.current.traverse((child) => {
      if (
        child.isMesh &&
        child.name.toLowerCase().includes("rim") &&
        !child.name.toLowerCase().includes("steering")
      ) {
        wheels.push(child.parent);
      }
    });

    if (wheels.length > 0) {
      wheels.forEach((wheel) => {
        gsap.killTweensOf(wheel.rotation);
        wheel.rotation.x = 0;
      });
    }

    // Dừng animation hiện tại của model
    if (actionRef.current) {
      actionRef.current.stop();
    }

    // Xóa video container
    if (videoElement) {
      const video = videoElement.querySelector("video");
      if (video) {
        video.pause();
      }
      videoElement.remove();
      setVideoElement(null);
    }

    console.log("🛑 Xe và bánh xe đã dừng quay!");
  }, [modelRef, actionRef, videoElement, selectedCarIndex]);

  return (
    <div className='color-customizer'>
      <div className='color-generator'></div>
      <div className='grid-component'>
        <div
          className='list-component'
          style={{
            maxHeight: window.innerHeight,
            zIndex: "3",
            position: "relative",
          }}>
          <ListCards
            selectedCarIndex={selectedCarIndex}
            selectType={selectType}
          />

          <div className='wheels-section-title'>SELECT YOUR WHEEL</div>
          <div className='wheels-list'>
            {wheelModels.map((wheel, index) => (
              <div
                key={index}
                className={`wheel-option ${
                  selectedWheel === wheel.id ? "selected" : ""
                }`}
                onClick={() => changeWheel(wheel.id)}>
                <img src={wheel.image} alt={`Wheel ${index + 1}`} />
                <span className='option-name'>Wheel {index + 1}</span>
              </div>
            ))}
          </div>

          <div className='steeringWheels-section-title'>
            SELECT YOUR STEERING WHEEL
          </div>
          <div className='steeringWheels-list'>
            {steeringWheelModels.map((wheel, index) => (
              <div
                key={index}
                className={`steeringWheel-option ${
                  selectedSteeringWheel === wheel.id ? "selected" : ""
                }`}
                onClick={() => changeSteeringWheel(wheel.id)}>
                <img src={wheel.image} alt={`Steering Wheel ${index + 1}`} />
                <span className='option-name'>Steering Wheel {index + 1}</span>
              </div>
            ))}
          </div>

          <div className='button-container'>
            <CustomButton
              onClick={rotateModel}
              ariaLabel='Surprise me'
              imageSrc='/logo/magic.png'
            />
            <CustomButton
              onClick={() => download(modelRef, rendererRef)}
              ariaLabel='Download Image'
              imageSrc='/logo/download.svg'
            />
            <CustomButton
              onClick={stopModel}
              ariaLabel='Stop me'
              imageSrc='/logo/stop.svg'
              imageStyle={{ color: "grey" }}
            />
          </div>

          {/* <NotePopup
            isOpen={isPopupOpen}
            onClose={closePopup}
            title={popupContent.title}
            content={popupContent.content}
          /> */}
        </div>
      </div>
    </div>
  );
};

const CustomButton = ({ onClick, ariaLabel, imageSrc, imageStyle }) => (
  <button
    className='apply-button'
    onClick={onClick}
    aria-label={ariaLabel}
    data-microtip-position='top'
    role='tooltip'>
    <img
      className='apply-colors'
      src={imageSrc}
      alt={ariaLabel}
      width={24}
      height={24}
      style={imageStyle}
    />
  </button>
);

CustomButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  imageStyle: PropTypes.object,
};

Customizer.propTypes = {
  modelRef: PropTypes.object.isRequired,
  controlsRef: PropTypes.object.isRequired,
  rendererRef: PropTypes.object.isRequired,
  selectedCarIndex: PropTypes.number.isRequired,
  actionRef: PropTypes.object.isRequired,
  sceneRef: PropTypes.object.isRequired,
  setColorIndex: PropTypes.func.isRequired,
  changeWheel: PropTypes.func.isRequired,
};

export default Customizer;
