import { firestore, storage } from "./firebase";

export async function createAlert(category, title, name, skintone, eyecolor, height, age, lastlocation, details, image, uploadedbyid, uploadedbyemail) {
    const alertsDb = firestore.collection('alerts');
    let imageUrl = '';

    if (image) {
        const storageRef = storage.ref();
        const imageRef = storageRef.child(`images/${new Date().getTime()}${image.name}`);
        try {
            let snapshot = await imageRef.put(image);
            imageUrl = await snapshot.ref.getDownloadURL();
        } catch (error) {
            console.error(error.message);
            return false;
        }
    } else {
        imageUrl = '';
    }

    try {
        await alertsDb.add({
            category: category,
            title: title,
            name: name,
            age: age,
            skintone: skintone,
            eyecolor: eyecolor,
            height: height,
            image: imageUrl,
            lastlocation: lastlocation,
            details: details,
            uploadedbyid: uploadedbyid,
            uploadedbyemail: uploadedbyemail,
            uploadedon: new Date()
        });

        return true;
    } catch (error) {
        console.error(error.message);
        return false;
    }

}
