# AI/ML Waste Classification Module

## Overview

The AI/ML module is responsible for classifying waste images into different categories to help users identify waste types and calculate estimated payments.

## Architecture

### Model Requirements

The system requires a deep learning model capable of multi-class image classification. Recommended architectures:

1. **MobileNetV2** - Optimized for mobile devices
2. **EfficientNet** - High accuracy with reasonable size
3. **ResNet50** - Proven accuracy for image classification

### Categories

The model should classify waste into these categories:

1. **Organic/Biodegradable**
   - Food waste
   - Garden waste
   - Compostable materials

2. **Plastic**
   - PET (Polyethylene Terephthalate)
   - HDPE (High-Density Polyethylene)
   - PVC (Polyvinyl Chloride)
   - LDPE (Low-Density Polyethylene)
   - PP (Polypropylene)
   - PS (Polystyrene)

3. **Paper/Cardboard**
   - Newspapers
   - Cardboard boxes
   - Office paper

4. **Metal**
   - Aluminum cans
   - Steel containers
   - Other metals

5. **Glass**
   - Bottles
   - Jars
   - Broken glass

6. **E-waste**
   - Electronic devices
   - Batteries
   - Circuit boards

7. **Hazardous**
   - Medical waste
   - Chemical containers
   - Other hazardous materials

## Implementation Options

### Option 1: Cloud-based Model (Recommended for MVP)

Use a cloud ML service like:
- **Google Cloud Vision API**
- **AWS Rekognition Custom Labels**
- **Azure Custom Vision**

**Pros:**
- Quick to implement
- No model training required initially
- Scalable infrastructure
- Automatic updates

**Cons:**
- API costs per request
- Requires internet connectivity
- Less control over model

### Option 2: Self-hosted Model

Deploy custom model on:
- **TensorFlow Serving**
- **PyTorch Serve**
- **ONNX Runtime**

**Pros:**
- Full control over model
- No per-request costs after training
- Can be optimized for specific needs

**Cons:**
- Requires ML expertise
- Training data needed
- Infrastructure to maintain

### Option 3: Hybrid Approach

- On-device model for quick classification
- Cloud model for verification and edge cases

## Model API Specification

### Endpoint: POST /api/v1/waste/classify

**Request:**
```json
{
  "images": ["base64_encoded_image1", "base64_encoded_image2"]
}
```

Or multipart/form-data with image files.

**Response:**
```json
{
  "status": "success",
  "data": {
    "classifications": [
      {
        "category": "plastic",
        "subCategory": "PET",
        "confidence": 0.92,
        "wasteTypeId": "uuid-here",
        "estimatedWeight": 0.5,
        "pricePerKg": 5.0,
        "estimatedPayment": 2.5
      }
    ],
    "primaryClassification": {
      "category": "plastic",
      "confidence": 0.92
    },
    "suggestions": [
      "Ensure the plastic is clean",
      "Remove any labels if possible"
    ]
  }
}
```

## Integration with Backend

### Controller Implementation

```javascript
// backend/src/api/controllers/waste.controller.js

const classifyWaste = async (req, res, next) => {
  try {
    const images = req.files; // Multer processed files
    
    // Call ML model endpoint
    const classificationResult = await mlService.classifyImages(images);
    
    // Get waste type details from database
    const wasteType = await db.WasteType.findOne({
      where: { 
        category: classificationResult.category,
        subCategory: classificationResult.subCategory 
      }
    });
    
    // Calculate pricing
    const estimatedWeight = classificationResult.estimatedWeight || 1.0;
    const estimatedPayment = wasteType.pricePerKg * estimatedWeight;
    
    res.json({
      status: 'success',
      data: {
        classification: classificationResult,
        wasteType,
        estimatedWeight,
        estimatedPayment
      }
    });
  } catch (error) {
    next(error);
  }
};
```

### ML Service Implementation

```javascript
// backend/src/services/mlService.js

const axios = require('axios');
const FormData = require('form-data');
const config = require('../config');

class MLService {
  async classifyImages(images) {
    // Prepare form data
    const formData = new FormData();
    images.forEach(image => {
      formData.append('images', image.buffer, image.originalname);
    });
    
    // Call ML model endpoint
    const response = await axios.post(
      config.ml.modelEndpoint,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          'Authorization': `Bearer ${config.ml.apiKey}`
        },
        timeout: 30000
      }
    );
    
    return this.processModelResponse(response.data);
  }
  
  processModelResponse(data) {
    // Process and validate model response
    // Apply confidence threshold
    // Map to waste categories
    
    return {
      category: data.predicted_class,
      subCategory: data.sub_class,
      confidence: data.confidence,
      estimatedWeight: data.estimated_weight
    };
  }
}

module.exports = new MLService();
```

## Mobile App Integration

### Camera Capture

```javascript
// mobile-apps/user-app/src/screens/Camera/CameraScreen.js

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {wasteAPI} from '../../services/api';

const captureImage = async () => {
  const result = await launchCamera({
    mediaType: 'photo',
    quality: 0.8,
    maxWidth: 1024,
    maxHeight: 1024,
  });
  
  if (!result.didCancel) {
    const formData = new FormData();
    formData.append('images', {
      uri: result.assets[0].uri,
      type: 'image/jpeg',
      name: 'waste.jpg',
    });
    
    const classification = await wasteAPI.classifyWaste(formData);
    // Handle classification result
  }
};
```

## Training Data Requirements

To train a custom model, you'll need:

1. **Dataset Size:** Minimum 1000 images per category
2. **Image Quality:** High resolution, good lighting
3. **Diversity:** Various angles, backgrounds, conditions
4. **Labeling:** Accurate category and sub-category labels

### Recommended Datasets

- **TACO Dataset**: Trash Annotations in Context
- **Waste Classification Dataset**: Available on Kaggle
- **Custom Collection**: Photograph local waste types

## Performance Metrics

Target metrics for the classifier:

- **Accuracy**: >90% on test set
- **Precision**: >85% per category
- **Recall**: >85% per category
- **F1 Score**: >85% overall
- **Inference Time**: <2 seconds on server, <5 seconds on mobile

## Continuous Improvement

1. **User Feedback Loop**
   - Allow users to correct misclassifications
   - Store feedback for retraining

2. **Active Learning**
   - Identify low-confidence predictions
   - Request manual review
   - Use verified data for retraining

3. **Model Versioning**
   - Version models (v1.0, v1.1, etc.)
   - A/B test new models
   - Rollback capability

## Security Considerations

1. **Input Validation**
   - Validate image format and size
   - Scan for malicious content
   - Rate limit API calls

2. **Privacy**
   - Don't store personal data in images
   - Anonymize training data
   - Comply with GDPR/privacy laws

3. **Model Security**
   - Protect model files
   - Secure API endpoints
   - Monitor for adversarial attacks

## Cost Estimation

### Cloud API Costs (Google Vision)
- $1.50 per 1000 images
- First 1000/month free
- Volume discounts available

### Self-hosted Costs
- GPU server: $200-500/month
- Training costs: $500-2000 one-time
- Maintenance: Development time

## Next Steps

1. **MVP Phase**: Use Google Cloud Vision API with custom labels
2. **Phase 2**: Train custom model on collected data
3. **Phase 3**: Optimize and deploy on-device model for offline use
4. **Phase 4**: Implement hybrid approach with edge computing

## References

- [TensorFlow Object Detection API](https://github.com/tensorflow/models/tree/master/research/object_detection)
- [Google Cloud Vision](https://cloud.google.com/vision)
- [PyTorch Mobile](https://pytorch.org/mobile/)
- [TACO Dataset](http://tacodataset.org/)
