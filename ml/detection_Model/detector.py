from ultralytics import YOLO

# Load YOLOv8 model
model = YOLO("yolov8s.pt")

# Allowed ingredient classes from COCO
COCO_TO_INGREDIENTS = {
    "banana": "banana",
    "apple": "apple",
    "orange": "orange",
    "broccoli": "broccoli",
    "carrot": "carrot"
}

def detect_ingredients(image_path):
    results = model.predict(image_path, conf=0.45)

    detected = set()

    for r in results:
        for box in r.boxes:
            cls_id = int(box.cls[0])
            class_name = model.names[cls_id]

            if class_name in COCO_TO_INGREDIENTS:
                detected.add(COCO_TO_INGREDIENTS[class_name])

    return list(detected)
