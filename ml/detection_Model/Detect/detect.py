from ultralytics import YOLO

model = YOLO("best.pt")

def detect_ingredients(image_path, top_k=2):
    results = model.predict(image_path)

    probs = results[0].probs.data.cpu().numpy()
    class_indices = probs.argsort()[::-1][:top_k]

    detected = []

    for idx in class_indices:
        confidence = probs[idx]
        if confidence > 0.03:
            detected.append(results[0].names[idx])

    return detected


print(detect_ingredients("image.jpg"))