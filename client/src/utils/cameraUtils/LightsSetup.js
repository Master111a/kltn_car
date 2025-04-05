/** @format */

import * as THREE from "three";
import gui from "./debug";

export const setupLights = (scene, debug = false, sceneType = "default") => {
  // Xóa toàn bộ đèn hiện có trong scene để tránh tình trạng trùng lặp ánh sáng
  scene.traverse((child) => {
    if (child instanceof THREE.Light) {
      scene.remove(child);
    }
  });

  // Light intensity modifiers based on scene type
  let intensityModifier = 1.0;

  // Adjust lighting based on which car model is being displayed
  if (sceneType === "model1") {
    // Giảm ánh sáng một chút cho model 1 để màu đỏ bớt chói
    intensityModifier = 1.2;
  } else if (sceneType === "model2") {
    // Tăng mạnh ánh sáng cho model 2 và điều chỉnh để màu sắc tươi hơn, không bị xám
    intensityModifier = 1.8;
  }

  // Ánh sáng chính: ambient light cho ánh sáng nền tương tự như StorePage
  const ambientLight = new THREE.AmbientLight(
    0xffffff,
    1.2 * intensityModifier
  );
  scene.add(ambientLight);

  // Ánh sáng chính hướng từ trên xuống (tương tự như StorePage)
  const directionalLight = new THREE.DirectionalLight(
    0xffffff,
    2.5 * intensityModifier
  );
  directionalLight.position.set(5, 5, 5);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  scene.add(directionalLight);

  // Ánh sáng phụ phía đối diện để giảm bóng đổ
  const fillLight = new THREE.DirectionalLight(
    0xffffff,
    1.2 * intensityModifier
  );
  fillLight.position.set(-5, 3, -5);
  scene.add(fillLight);

  // Ánh sáng viền để làm nổi bật các cạnh
  const rimLight = new THREE.DirectionalLight(
    0xffffff,
    1.0 * intensityModifier
  );
  rimLight.position.set(0, 5, -5);
  scene.add(rimLight);

  // Ánh sáng phía trước xe
  const frontLight = new THREE.DirectionalLight(
    0xffffff,
    1.0 * intensityModifier
  );
  frontLight.position.set(0, 2, 5);
  frontLight.target.position.set(0, 0, 0);
  scene.add(frontLight);
  scene.add(frontLight.target);

  // Thêm hai đèn nhẹ từ hai bên để làm mềm bóng đổ
  const leftLight = new THREE.DirectionalLight(
    0xffffff,
    0.7 * intensityModifier
  );
  leftLight.position.set(-4, 2, 0);
  leftLight.target.position.set(0, 0, 0);
  scene.add(leftLight);
  scene.add(leftLight.target);

  const rightLight = new THREE.DirectionalLight(
    0xffffff,
    0.7 * intensityModifier
  );
  rightLight.position.set(4, 2, 0);
  rightLight.target.position.set(0, 0, 0);
  scene.add(rightLight);
  scene.add(rightLight.target);

  // Thêm ánh sáng từ dưới lên để giảm bóng tối ở phần gầm xe
  const bottomLight = new THREE.DirectionalLight(
    0xffffff,
    0.4 * intensityModifier
  );
  bottomLight.position.set(0, -3, 0);
  bottomLight.target.position.set(0, 0, 0);
  scene.add(bottomLight);
  scene.add(bottomLight.target);

  if (debug) {
    // Thêm các helper để dễ dàng debug trong môi trường phát triển
    const directionalLightHelper = new THREE.DirectionalLightHelper(
      directionalLight,
      1
    );
    const fillLightHelper = new THREE.DirectionalLightHelper(fillLight, 1);
    const rimLightHelper = new THREE.DirectionalLightHelper(rimLight, 1);
    scene.add(directionalLightHelper);
    scene.add(fillLightHelper);
    scene.add(rimLightHelper);
  }

  // Add scene type selector to GUI
  gui
    .add({ sceneType: sceneType }, "sceneType", ["default", "model1", "model2"])
    .name("Loại cảnh")
    .onChange((value) => {
      console.log("Đã thay đổi loại cảnh sang:", value);
    });

  // Add global intensity control to GUI
  const intensityControls = {
    globalIntensity: intensityModifier,
    ambientIntensity: ambientLight.intensity,
    directionalIntensity: directionalLight.intensity,
    fillIntensity: fillLight.intensity,
    rimIntensity: rimLight.intensity,
  };

  gui
    .add(intensityControls, "globalIntensity", 0.1, 3.0, 0.05)
    .name("Cường độ tổng thể")
    .onChange((value) => {
      ambientLight.intensity =
        intensityControls.ambientIntensity * (value / intensityModifier);
      directionalLight.intensity =
        intensityControls.directionalIntensity * (value / intensityModifier);
      fillLight.intensity =
        intensityControls.fillIntensity * (value / intensityModifier);
      rimLight.intensity =
        intensityControls.rimIntensity * (value / intensityModifier);
      frontLight.intensity = 1.0 * value;
      leftLight.intensity = 0.7 * value;
      rightLight.intensity = 0.7 * value;
      bottomLight.intensity = 0.4 * value;
    });

  return {
    ambientLight,
    directionalLight,
    fillLight,
    rimLight,
    frontLight,
    leftLight,
    rightLight,
    bottomLight,
    sceneType,
  };
};
