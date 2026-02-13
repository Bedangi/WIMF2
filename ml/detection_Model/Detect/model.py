from ultralytics import YOLO

# Create a classification model
model = YOLO("yolov8s-cls.pt")

# Train
model.train(
    data="Vegetable",   # folder, not yaml
    imgsz=224,
    epochs=30,
    batch=16
)

# After training, best model is saved at: runs/classify/train/weights/best.pt
