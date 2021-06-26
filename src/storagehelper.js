import { firestore, storage } from "./firebase";

export async function createAlert(category, title, details, image, uploadedby) {
    const alertsDb = firestore.collection('alerts');
    let imageUrl = '';

    if (image) {
        const storageRef = storage.ref();
        const imageRef = storageRef.child(`images/${image.name}`);
        try {
            let snapshot = await imageRef.put(image);
            imageUrl = await snapshot.ref.getDownloadURL();
        } catch (error) {
            console.error(error);
            return false;
        }
    } else {
        imageUrl = '';
    }

    try {
        await alertsDb.add({
            category: category,
            title: title,
            details: details,
            image: imageUrl,
            uploadedby: uploadedby
        });

        return true;
    } catch (error) {
        return false
    }

}
