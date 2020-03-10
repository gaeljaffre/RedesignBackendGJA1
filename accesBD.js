function snapshotToArray(snapshot, idContrat) {
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        if(idContrat == undefined || item.idContrat == idContrat)
          returnArr.push(item);
    });

    return returnArr;
};

module.exports = { snapshotToArray };
