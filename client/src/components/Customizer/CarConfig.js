/** @format */
import { GUI } from "dat.gui";

export const carModels = [
  {
    modelUrl: "/model/sportCar.glb",
    // modelUrl: "model/ac_-_lotus_evora_s.glb",
    name: "Build your own Car",
    id: "car-3d",
    src: "/images/dark.jpeg",
    colorConfigs: [
      {
        colors: [
          // "#22005D",
          // "#F9F1DF",
          // "#3b2815",
          // "#FF0000",
          // "#008FD2",
          // "#FFC000",
          // "#00008B",
          // "#221E1F",
          "#FF0000",
          "#2C3E50",
          "#F5E6CC",
          "#8E44AD",
          "#E0BBE4",

          // "#C0392B",
          "#FAD4C0",
          "#2980B9",
          "#A0D2DB",
        ],
        types: [
          "outer-body",
          "outer-body-parts",
          "left-door-paint",
          "right-door-paint",
        ],
        title: "Paint",
        image: "/images/car-pic/paint.jpg",
        show: true,
        modelPosition: {
          x: 3.5278410968518297,
          y: 1.034328461078682,
          z: 2.1886489037005443,
        },
      },
      // {
      //   colors: [
      //     '#F4F6EF',
      //     '#F9F1DF',
      //     '#B50024',
      //     '#127048',
      //     '#008FD2',
      //     '#34394B',
      //     '#9A9B9D',
      //     '#44312E',
      //     '#221E1F',
      //   ],
      //   types: ['left-door-paint', 'right-door-paint'],
      //   title: 'Car Door',
      //   show: true,
      //   modelPosition: {
      //     x: 3.5278410968518297,
      //     y: 1.034328461078682,
      //     z: 2.1886489037005443
      //   },
      // },
      {
        colors: [
          "#F9F1DF",
          "#FF0000",
          "#008FD2",
          "#34394B",
          "#9A9B9D",
          "#44312E",
          "#000000",
        ],
        types: ["back-bumbper"],
        title: "Outer-line",
        image: "/images/car-pic/outer-line.jpg",
        show: true,
        modelPosition: {
          x: 2.792094620445568,
          y: 2.69567217362244,
          z: 1.3310710734699898,
        },
      },
      {
        colors: [
          "#FF0000",
          "#000000",
          "#FFE900",
          "#9A9B9D",
          "#22005D",
          "#070675",
        ],
        types: [
          "seat-belt",
          "gear-rest",
          "gauge-color",
          "Seat-holder",
          "red-1",
          "red-2",
          "red-4",
          "red-5",
        ],
        title: "Seat-belt & Gauge",
        image: "/images/car-pic/seat-belt.jpg",
        show: false,
        modelPosition: {
          x: 1.948441045552817,
          y: 3.3688745925112467,
          z: 0.03381660898002415,
        },
      },
      {
        colors: ["#1E140A", "#00008B", "#000", "#22005D"],
        types: ["side-black-door"],
        title: "Side Stripes",
        image: "/images/car-pic/stripe.jpg",
        show: true,
        modelPosition: {
          x: 4.264783568063599,
          y: 1.1205317219655524,
          z: 0.5793072706007855,
        },
      },
      // {
      //   colors: ['#000', '#5C4033', '#BEE2D4', '#5480A3'],
      //   types: ['left-mirror', 'right-mirror'],
      //   title: 'Rear mirror',
      //   show: false,
      //   modelPosition: {
      //     x: 1.091550198705638, y: 2.412066848266626, z: 2.5344727421319986
      //   },
      // },
      {
        colors: ["#000", "#22005D", "#070675", "#2b1d10"],
        types: ["Secondary-base"],
        title: "Secondary-base",
        image: "/images/car-pic/sec-base.jpg",
        show: false,
        modelPosition: {
          x: 1.0297888674402929,
          y: 2.7122584585064744,
          z: -2.2119599177283398,
        },
      },
      {
        colors: ["#000", "#22005D", "#070675", "#3b2815"],
        types: ["Steering-wheel", "Steering-handle"],
        title: "Steering wheel",
        image: "/images/car-pic/Steering.jpg",
        show: false,
        modelPosition: {
          x: 3.002587821439075,
          y: 1.749056032366268,
          z: -1.389404553421024,
        },
      },
      {
        colors: ["#000", "#2b1d10"],
        types: ["Front-seats", "right-inner-door", "left-door-inside"],
        title: "Seat color",
        image: "/images/car-pic/seat.jpg",
        show: false,
        modelPosition: {
          x: -0.4354405601616895,
          y: 2.832152187505139,
          z: -0.04914204560550159,
        },
      },
      {
        colors: [
          "#A1765B",
          "#7FCDCD",
          "#00008B",
          "#2D728F",
          "#6B5B95",
          "#F5F5DC",
          "#000",
        ],
        types: ["chrome"],
        title: "Symbol-color",
        image: "/images/car-pic/symbol.jpg",
        show: false,
        modelPosition: {
          x: 1.2804794647833,
          y: 1.649099151785669,
          z: 3.0743785156377066,
        },
      },
      {
        colors: ["#A569BD", "#3b2815", "#00008B", "#000", "#F39C12", "#95A5A6"],
        types: ["rim-1", "rim-2", "rim-3"],
        title: "Rim",
        image: "/images/car-pic/rim.jpg",
        show: true,
        modelPosition: {
          x: 4.254315223613636,
          y: 1.043988829818961,
          z: 0.7546653222255745,
        },
      },
      {
        colors: ["#A569BD", "#3b2815", "#00008B", "#000", "#F39C12", "#95A5A6"],
        types: ["outer-rim-1", "outer-rim-2", "outer-rim-3"],
        title: "Outer Rim",
        image: "/images/car-pic/outer-rim.jpg",
        show: true,
        modelPosition: {
          x: 4.254315223613636,
          y: 1.043988829818961,
          z: 0.7546653222255745,
        },
      },
      {
        colors: ["#3b2815", "#7FCDCD", "#00008B", "#000", "#6B5B95"],
        types: ["light-stripe"],
        title: "Gear box + display",
        image: "/images/car-pic/gear.jpg",
        show: false,
        modelPosition: {
          x: 1.0024611270806856,
          y: 3.0984092213909897,
          z: -1.6278372890595647,
        },
      },
      {
        colors: ["#3E92CC", "#000", "#3b2815", "#2D728F", "#6B5B95"],
        types: ["Object_96"],
        title: "Floor mat",
        image: "/images/car-pic/mat.jpg",
        show: false,
        modelPosition: {
          x: 2.1602019395083447,
          y: 3.1288215462611144,
          z: -1.0556548636810237,
        },
      },
    ],
    wheelPositions: [
      [0.85, 0.35, 1.35], // Bánh trước phải
      [-0.85, 0.35, 1.35], // Bánh trước trái
      [0.9, 0.35, -1.2], // Bánh sau phải
      [-0.9, 0.35, -1.2], // Bánh sau trái
    ],
  },
  {
    modelUrl: "/model/ac_-_lotus_evora_s.glb",
    name: "Build your own Lotus Evora S",
    id: "lotus-evora-s",
    src: "/images/lotus-evora-s.jpeg",
    colorConfigs: [
      {
        colors: [
          "#F4C430",
          "#1F2A44",
          "#2D2D2D",
          // "#EDEDED",
          "#C0392B",
          // "#8E44AD",
          "#D4A017",
          "#9B9B9B",
          // "#4A90E2",

          "#8B0000",
          "#FFB6C1",
        ],
        types: [
          "g_DOOR_EXT_L_SUB2_Carpaint_Main_0",
          "polymsh58_SUB1_Carpaint_Main_0",
          "g_BUMPER_F_SUB2_Carpaint_Main_0",
          "g_BUMPER_R_SUB0_Carpaint_Main_0",
          "g_TRUNK_SUB3_Carpaint_Main_0",
          "g_BODY_EXT_SUB9_Carpaint_Main_0",
          "GEO_Cockpit_SUB1_Carpaint_Main_0",
        ],
        title: "Thân xe",
        image: "/images/car-pic/paint.jpg",
        show: true,
        modelPosition: {
          x: 3.0,
          y: 1.5,
          z: 3.0,
        },

        // modelPosition: {
        //   x: -10,
        //   y: 5,
        //   z: 0.5,
        // },
      },
      {
        colors: [
          "#1C2526",
          "#3A4042",
          "#2D2D2D",
          "#9B9B9B",
          "#6C757D",
          "#000000",
        ],
        types: [
          "g_Wheel_Tyre_Tread_LR_2_Tyre_Tread_0",
          "g_Wheel_Tyre_Tread_RR_2_Tyre_Tread_0",
          "g_Wheel_Tyre_Tread_RF_2_Tyre_Tread_0",
          "g_Wheel_Tyre_Tread_LF_2_Tyre_Tread_0",
        ],
        title: "Lốp xe",
        image: "/images/car-pic/rim.jpg",
        show: true,
        modelPosition: {
          x: 3.0,
          y: 0.8,
          z: 2.0,
        },
      },
      {
        colors: [
          "#A9A9A9",
          "#BFAF7A",
          "#212121",
          "#C0C0C0",
          "#FFD700",
          "#D4A017",
          "#E6E6FA",
        ],
        types: [
          "g_RIM_LR_2_Carpaint_Main_0",
          "g_RIM_RR_2_Carpaint_Main_0",
          "g_RIM_RF_2_Carpaint_Main_0",
          "g_RIM_LF_2_Carpaint_Main_0",
        ],
        title: "Vành xe",
        image: "/images/car-pic/rim.jpg",
        show: true,
        modelPosition: {
          x: 2.8,
          y: 0.8,
          z: 2.0,
        },
      },
      {
        colors: [
          "#B0C4DE",
          "#2C2F33",
          "#4682B4",
          "#ADD8E6",
          "#D3D3D3",
          "#5D9EA0",
        ],
        types: [
          "cube_SUB2_INT_Vetro_0",
          "g_DOOR_EXT_L_SUB1_Glass_0",
          "polymsh58_SUB0_Glass_0",
          "g_BODY_EXT_SUB3_Glass_0",
          "g_BODY_EXT_SUB8_INT_Glass_side_0",
        ],
        title: "Kính",
        image: "/images/car-pic/sec-base.jpg",
        show: true,
        modelPosition: {
          x: 3.0,
          y: 1.8,
          z: 2.5,
        },
      },
    ],
  },
];

export default carModels;

// const carModels = [
//   {
//     modelUrl: "/model/sportCar.glb",
//     // modelUrl: "model/ac_-_lotus_evora_s.glb",
//     name: "Build your own Car",
//     id: "car-3d",
//     src: "/images/dark.jpeg",
//     colorConfigs: [
//       {
//         colors: [
//           // "#22005D",
//           // "#F9F1DF",
//           // "#3b2815",
//           // "#FF0000",
//           // "#008FD2",
//           // "#FFC000",
//           // "#00008B",
//           // "#221E1F",
//           "#FF0000",
//           "#2C3E50",
//           "#F5E6CC",
//           "#8E44AD",
//           "#E0BBE4",

//           // "#C0392B",
//           "#FAD4C0",
//           "#2980B9",
//           "#A0D2DB",
//         ],
//         types: [
//           "outer-body",
//           "outer-body-parts",
//           "left-door-paint",
//           "right-door-paint",
//         ],
//         title: "Paint",
//         image: "/images/car-pic/paint.jpg",
//         show: true,
//         modelPosition: {
//           x: 3.5278410968518297,
//           y: 1.034328461078682,
//           z: 2.1886489037005443,
//         },
//       },
//       // {
//       //   colors: [
//       //     '#F4F6EF',
//       //     '#F9F1DF',
//       //     '#B50024',
//       //     '#127048',
//       //     '#008FD2',
//       //     '#34394B',
//       //     '#9A9B9D',
//       //     '#44312E',
//       //     '#221E1F',
//       //   ],
//       //   types: ['left-door-paint', 'right-door-paint'],
//       //   title: 'Car Door',
//       //   show: true,
//       //   modelPosition: {
//       //     x: 3.5278410968518297,
//       //     y: 1.034328461078682,
//       //     z: 2.1886489037005443
//       //   },
//       // },
//       {
//         colors: [
//           "#F9F1DF",
//           "#FF0000",
//           "#008FD2",
//           "#34394B",
//           "#9A9B9D",
//           "#44312E",
//           "#000000",
//         ],
//         types: ["back-bumbper"],
//         title: "Outer-line",
//         image: "/images/car-pic/outer-line.jpg",
//         show: true,
//         modelPosition: {
//           x: 2.792094620445568,
//           y: 2.69567217362244,
//           z: 1.3310710734699898,
//         },
//       },
//       {
//         colors: [
//           "#FF0000",
//           "#000000",
//           "#FFE900",
//           "#9A9B9D",
//           "#22005D",
//           "#070675",
//         ],
//         types: [
//           "seat-belt",
//           "gear-rest",
//           "gauge-color",
//           "Seat-holder",
//           "red-1",
//           "red-2",
//           "red-4",
//           "red-5",
//         ],
//         title: "Seat-belt & Gauge",
//         image: "/images/car-pic/seat-belt.jpg",
//         show: false,
//         modelPosition: {
//           x: 1.948441045552817,
//           y: 3.3688745925112467,
//           z: 0.03381660898002415,
//         },
//       },
//       {
//         colors: ["#1E140A", "#00008B", "#000", "#22005D"],
//         types: ["side-black-door"],
//         title: "Side Stripes",
//         image: "/images/car-pic/stripe.jpg",
//         show: true,
//         modelPosition: {
//           x: 4.264783568063599,
//           y: 1.1205317219655524,
//           z: 0.5793072706007855,
//         },
//       },
//       // {
//       //   colors: ['#000', '#5C4033', '#BEE2D4', '#5480A3'],
//       //   types: ['left-mirror', 'right-mirror'],
//       //   title: 'Rear mirror',
//       //   show: false,
//       //   modelPosition: {
//       //     x: 1.091550198705638, y: 2.412066848266626, z: 2.5344727421319986
//       //   },
//       // },
//       {
//         colors: ["#000", "#22005D", "#070675", "#2b1d10"],
//         types: ["Secondary-base"],
//         title: "Secondary-base",
//         image: "/images/car-pic/sec-base.jpg",
//         show: false,
//         modelPosition: {
//           x: 1.0297888674402929,
//           y: 2.7122584585064744,
//           z: -2.2119599177283398,
//         },
//       },
//       {
//         colors: ["#000", "#22005D", "#070675", "#3b2815"],
//         types: ["Steering-wheel", "Steering-handle"],
//         title: "Steering wheel",
//         image: "/images/car-pic/Steering.jpg",
//         show: false,
//         modelPosition: {
//           x: 3.002587821439075,
//           y: 1.749056032366268,
//           z: -1.389404553421024,
//         },
//       },
//       {
//         colors: ["#000", "#2b1d10"],
//         types: ["Front-seats", "right-inner-door", "left-door-inside"],
//         title: "Seat color",
//         image: "/images/car-pic/seat.jpg",
//         show: false,
//         modelPosition: {
//           x: -0.4354405601616895,
//           y: 2.832152187505139,
//           z: -0.04914204560550159,
//         },
//       },
//       {
//         colors: [
//           "#A1765B",
//           "#7FCDCD",
//           "#00008B",
//           "#2D728F",
//           "#6B5B95",
//           "#F5F5DC",
//           "#000",
//         ],
//         types: ["chrome"],
//         title: "Symbol-color",
//         image: "/images/car-pic/symbol.jpg",
//         show: false,
//         modelPosition: {
//           x: 1.2804794647833,
//           y: 1.649099151785669,
//           z: 3.0743785156377066,
//         },
//       },
//       {
//         colors: ["#A569BD", "#3b2815", "#00008B", "#000", "#F39C12", "#95A5A6"],
//         types: ["rim-1", "rim-2", "rim-3"],
//         title: "Rim",
//         image: "/images/car-pic/rim.jpg",
//         show: true,
//         modelPosition: {
//           x: 4.254315223613636,
//           y: 1.043988829818961,
//           z: 0.7546653222255745,
//         },
//       },
//       {
//         colors: ["#A569BD", "#3b2815", "#00008B", "#000", "#F39C12", "#95A5A6"],
//         types: ["outer-rim-1", "outer-rim-2", "outer-rim-3"],
//         title: "Outer Rim",
//         image: "/images/car-pic/outer-rim.jpg",
//         show: true,
//         modelPosition: {
//           x: 4.254315223613636,
//           y: 1.043988829818961,
//           z: 0.7546653222255745,
//         },
//       },
//       {
//         colors: ["#3b2815", "#7FCDCD", "#00008B", "#000", "#6B5B95"],
//         types: ["light-stripe"],
//         title: "Gear box + display",
//         image: "/images/car-pic/gear.jpg",
//         show: false,
//         modelPosition: {
//           x: 1.0024611270806856,
//           y: 3.0984092213909897,
//           z: -1.6278372890595647,
//         },
//       },
//       {
//         colors: ["#3E92CC", "#000", "#3b2815", "#2D728F", "#6B5B95"],
//         types: ["Object_96"],
//         title: "Floor mat",
//         image: "/images/car-pic/mat.jpg",
//         show: false,
//         modelPosition: {
//           x: 2.1602019395083447,
//           y: 3.1288215462611144,
//           z: -1.0556548636810237,
//         },
//       },
//     ],
//   },
// ];

// const carModels = [
//   {
//     modelUrl: "model/ac_-_lotus_evora_s.glb", // Đường dẫn đến file mô hình 3D
//     name: "Build your own Lotus Evora S",
//     id: "lotus-evora-s",
//     src: "/images/lotus-evora-s.jpeg", // Hình ảnh minh họa xe
//     colorConfigs: [
//       {
//         colors: [
//           "#1F2A44", // Porsche Slate Blue – xanh đá đậm, sang trọng
//           "#2D2D2D", // Porsche Jet Black Metallic – đen ánh kim, mạnh mẽ
//           "#EDEDED", // Porsche Carrera White – trắng Carrera, thanh lịch
//           "#C0392B", // Porsche Guards Red – đỏ Guards, rực rỡ, thể thao
//           "#8E44AD", // Porsche Violet – tím ánh, độc đáo, cao cấp
//           "#D4A017", // Porsche Racing Yellow – vàng đua xe, nổi bật, năng động
//           "#9B9B9B", // Porsche Agate Grey – xám đá, tinh tế, trung tính
//           "#4A90E2", // Porsche Miami Blue – xanh Miami, tươi sáng, hiện đại
//           "#F4C430", // Porsche Signal Yellow – vàng tín hiệu, bắt mắt, thể thao
//           "#8B0000", // Porsche Dark Red – đỏ đậm, sâu, sang trọng
//           "#FFB6C1", // Porsche Light Pink – hồng nhạt, tinh tế
//           "#4682B4", // Porsche Steel Blue – xanh thép, trung tính, hiện đại
//           "#6C757D", // Porsche Anthracite Grey – xám than, hiện đại
//           "#F8E1C6", // Porsche Ivory Beige – be ngà, ấm áp, sang trọng
//           "#5D9EA0", // Porsche Aqua Blue – xanh ngọc, nhẹ nhàng
//         ],
//         types: [
//           "g_DOOR_EXT_L_SUB2_Carpaint_Main_0", // Cửa trái
//           "polymsh58_SUB1_Carpaint_Main_0", // Cửa phải
//           "g_BUMPER_F_SUB2_Carpaint_Main_0", // Cản trước
//           "g_BUMPER_R_SUB0_Carpaint_Main_0", // Cản sau
//           "g_TRUNK_SUB3_Carpaint_Main_0", // Cốp sau
//           "g_BODY_EXT_SUB9_Carpaint_Main_0", // Thân xe
//           "GEO_Cockpit_SUB1_Carpaint_Main_0", // Buồng lái
//         ],
//         title: "Thân xe",
//         image: "/images/car-pic/body.jpg", // Hình ảnh minh họa thân xe
//         show: true,
//         modelPosition: {
//           // x: 3.5278410968518297,
//           // y: 1.034328461078682,
//           // z: 2.1886489037005443,
//           x: -10,
//           y: 5,
//           z: 0.5,
//         },
//       },
//       {
//         colors: [
//           "#1C2526", // Glossy Black – đen bóng, thực tế và thẩm mỹ
//           "#3A4042", // Dark Slate – xám đá đậm, khác biệt
//           "#2D2D2D", // Porsche Jet Black Metallic – đen ánh kim, mạnh mẽ
//           "#9B9B9B", // Porsche Agate Grey – xám đá, tinh tế
//           "#6C757D", // Porsche Anthracite Grey – xám than, hiện đại
//           "#000000", // Pure Black – đen thuần, sâu
//         ],
//         types: [
//           "g_Wheel_Tyre_Tread_LR_2_Tyre_Tread_0", // Bánh xe trái sau
//           "g_Wheel_Tyre_Tread_RR_2_Tyre_Tread_0", // Bánh xe phải sau
//           "g_Wheel_Tyre_Tread_RF_2_Tyre_Tread_0", // Bánh xe phải trước
//           "g_Wheel_Tyre_Tread_LF_2_Tyre_Tread_0", // Bánh xe trái trước
//         ],
//         title: "Lốp xe",
//         image: "/images/car-pic/tires.jpg", // Hình ảnh minh họa lốp xe
//         show: true,
//         modelPosition: {
//           x: -10,
//           y: 3,
//           z: 0.5,
//         },
//       },
//       {
//         colors: [
//           "#A9A9A9", // Satin Silver – bạc mờ, sang trọng
//           "#BFAF7A", // Bronze Metallic – đồng ánh kim, thể thao
//           "#212121", // Glossy Black – đen bóng, mạnh mẽ
//           "#C0C0C0", // Chrome Silver – bạc chrome, sáng bóng
//           "#FFD700", // Gold – vàng ánh kim, cao cấp
//           "#D4A017", // Porsche Racing Yellow – vàng đua xe, nổi bật
//           "#E6E6FA", // Lavender – tím nhạt ánh, tinh tế
//         ],
//         types: [
//           "g_RIM_LR_2_Carpaint_Main_0", // Vành xe trái sau
//           "g_RIM_RR_2_Carpaint_Main_0", // Vành xe phải sau
//           "g_RIM_RF_2_Carpaint_Main_0", // Vành xe phải trước
//           "g_RIM_LF_2_Carpaint_Main_0", // Vành xe trái trước
//         ],
//         title: "Vành xe",
//         image: "/images/car-pic/rims.jpg", // Hình ảnh minh họa vành xe
//         show: true,
//         modelPosition: {
//           x: -10,
//           y: 3,
//           z: 0.5,
//         },
//       },
//       {
//         colors: [
//           "#B0C4DE", // Light Steel Blue – xanh thép nhạt, hiện đại
//           "#2C2F33", // Dark Graphite – than chì đậm, bí ẩn
//           "#4682B4", // Porsche Steel Blue – xanh thép, trung tính
//           "#ADD8E6", // Light Blue – xanh nhạt, nhẹ nhàng
//           "#D3D3D3", // Light Grey – xám nhạt, tinh tế
//           "#5D9EA0", // Porsche Aqua Blue – xanh ngọc, thanh lịch
//         ],
//         types: [
//           "cube_SUB2_INT_Vetro_0", // Kính nội thất
//           "g_DOOR_EXT_L_SUB1_Glass_0", // Kính cửa trái
//           "polymsh58_SUB0_Glass_0", // Kính cửa phải
//           "g_BODY_EXT_SUB3_Glass_0", // Kính thân xe
//           "g_BODY_EXT_SUB8_INT_Glass_side_0", // Kính bên trong
//         ],
//         title: "Kính",
//         image: "/images/car-pic/glass.jpg", // Hình ảnh minh họa kính
//         show: true,
//         modelPosition: {
//           x: -5,
//           y: 6,
//           z: 0.5,
//         },
//       },
//     ],
//   },
// ];

// export const wheelModels = [
//   {
//     id: "wheel1",
//     image: "/images/car-pic/rim.jpg",
//     src: "/model/rotiform_vce.glb",
//     rotation: { x: Math.PI / 2, y: Math.PI / 2, z: Math.PI / 2 },
//   },
//   {
//     id: "wheel2",
//     image: "/images/car-pic/rim.jpg",
//     src: "/model/work_vs-xx_car_rim.glb",
//     rotation: { x: Math.PI / 2, y: 0, z: -Math.PI / 2 },
//   },
//   {
//     id: "wheel3",
//     image: "/images/car-pic/rim.jpg",
//     src: "/model/audi_rim.glb",
//     rotation: { x: 0, y: -Math.PI / 2, z: Math.PI / 2 },
//   },
// ];

export const wheelModels = [
  {
    id: "wheel1",
    image: "/images/car-pic/rim.jpg",
    src: "/model/rotiform_vce.glb",
    rotation: { x: Math.PI / 2, y: Math.PI / 2, z: Math.PI / 2 },
  },
  {
    id: "wheel2",
    image: "/images/car-pic/rim.jpg",
    src: "/model/work_vs-xx_car_rim.glb",
    rotation: { x: Math.PI / 2, y: 0, z: -Math.PI / 2 },
  },
  {
    id: "wheel3",
    image: "/images/car-pic/rim.jpg",
    src: "/model/audi_rim.glb",
    rotation: { x: 0, y: -Math.PI / 2, z: Math.PI / 2 },
  },
];
export const steeringWheelModels = [
  {
    id: "stearingWheel1",
    image: "/images/car-pic/Steering.jpg",
    src: "/model/steering_wheel_l505.glb",
    rotation: { x: 0, y: 0, z: 0 },
  },
  {
    id: "stearingWheel2",
    image: "/images/car-pic/Steering.jpg",
    src: "/model/the_adam_lz_steering_wheel.glb",
    rotation: { x: -Math.PI / 2, y: 0, z: 0 },
  },
  {
    id: "stearingWheel3",
    image: "/images/car-pic/Steering.jpg",
    src: "/model/the_adam_lz_steering_wheel.glb",
    rotation: { x: 0, y: 0, z: 0 },
  },
];
