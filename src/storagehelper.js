import { firestore, storage } from "./firebase";

export async function createAlert(category, title, name, skintone, eyecolor, height, age, lastlocation, details, image, uploadedbyid, uploadedbyemail) {
    const alertsDb = firestore.collection('alerts');
    let imageUrl = '';
    let imagename = `images/${new Date().getTime()}${image.name}`;

    if (image) {
        const storageRef = storage.ref();
        const imageRef = storageRef.child(imagename);
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
            imagename: imagename,
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

export async function updateAlert(doc, category, title, name, skintone, eyecolor, height, age, lastlocation, details, image, uploadedbyid, uploadedbyemail) {
    const alertsDb = firestore.collection('alerts');
    let imageUrl = '';
    let imagename = `images/${new Date().getTime()}${image.name}`;

    try {
        await alertsDb.doc(doc)
        .update({
            category: category,
            title: title,
            name: name,
            age: age,
            skintone: skintone,
            eyecolor: eyecolor,
            height: height,
            lastlocation: lastlocation,
            details: details,
            updatedbyid: uploadedbyid,
            updatedbyemail: uploadedbyemail,
            updatedon: new Date()
        });

        const alert = await alertsDb.doc(doc).get();
        const oldimagename = alert.data().imagename;

        if(image !== null) {
            // First delete the old image
            const storageRef = storage.ref();
            let imageRef = storageRef.child(oldimagename);
            try {
                await imageRef.delete();
            } catch (error) {
                console.error(error.message);
            }
            
            // upload the new image
            imageRef = storageRef.child(imagename);
            let snapshot = await imageRef.put(image);
            imageUrl = await snapshot.ref.getDownloadURL();
            try {
                await alertsDb.doc(doc).update({
                    image: imageUrl,
                    imagename: imagename,
                });
            } catch (error) {
                console.error(error.message);
                return false;
            }
        }

        return true;
    } catch (error) {
        console.error(error.message);
        return false;
    }
}

export async function deleteAlert(doc) {
    const alertsDb = firestore.collection('alerts');

    const alert = await alertsDb.doc(doc).get();
    const oldimagename = alert.data().imagename;

    // First delete the image file from storage
    const storageRef = storage.ref();
    let imageRef = storageRef.child(oldimagename);
    try {
        await imageRef.delete();
    } catch (error) {
        console.error(error.message);
        return false;
    }

    // now delete the alert document from firestore
    try {
        await alertsDb.doc(doc).delete();
    } catch (error) {
        console.error(error.message);
        return false;
    }

    return true;
}
