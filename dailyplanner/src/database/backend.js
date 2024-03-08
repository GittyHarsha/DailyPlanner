const DatabaseName = "myDatabase";
export function connectToIndexedDB() {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DatabaseName, 1);

    request.onerror = (event) => {
      reject(event.target.error);
    };

    request.onsuccess = (event) => {
      let db = event.target.result;
      resolve(event.target.result);
    };
    request.onupgradeneeded = (event) => {
      window.alert("database upgradeneeded");
      console.log("upgradeneeded", event.target.result);
      const db=event.target.result;
      const MonthlyGoals = db.createObjectStore("MonthlyGoals", 
      {
        keyPath: 'id',
        autoIncrement: 'true'
      });
      const Priority = db.createObjectStore("Priority", 
      {
        keyPath: 'date',
      });
      const Highlights = db.createObjectStore("Highlights", 
      {
        keyPath: 'date',
      });
      const Tasks = db.createObjectStore("Tasks", 
      {
        keyPath: 'id',
      });
      const HabitTracker = db.createObjectStore("HabitTracker", 
      {
        keyPath: 'id',
        /*

        Schema->
        id: 
        Month:
        Year:
        Name:
        Boolean_array: [1, 0, 0],
        
        */
      });
      HabitTracker.createIndex("MonthYearIndex", ["month", "year"]);
    
    }

  });
}


export function  add_object(storeName, newObject) {
  return new Promise((resolve, reject) => {
    connectToIndexedDB().then((db) => {
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    let success=true;
    console.log(`${storeName} : key:  ${store.keyPath}`);
if(store.keyPath =="id") {
    // Open a cursor in reverse direction to get the highest ID first
    const cursorRequest = store.openCursor(null, "prev");
   
    cursorRequest.onsuccess = function(event) {
      const cursor = event.target.result;
     
      if (cursor) {
        const highestId = cursor.key;
        const newId = Number(highestId) + 1;
        let obj = {...newObject, id: newId.toString()};
        // Add the new object with incremented ID
        store.add(obj);
        console.log("object added: ", obj);

        console.log("New object added with ID:", newId.toString());
      } else {
        // No objects in the store, add with ID 1
        store.add({ ...newObject, id: "1" });
        console.log("New object added with ID:", 1);
      }
    };

    cursorRequest.onerror = function(event) {
     success=false;
  
    }
  }
  else {
    let key = store.keyPath;
    let id = newObject[key];
    get_object(storeName, id).then(
      (msg)=> {}
    )
    .catch((err)=> {
     add_object(storeName, newObject);
    })
   
  }

    transaction.oncomplete = function() {
      db.close();
      if(success) {
      resolve("success");
      }
      else {
        reject("error");
      }
      
    };

    transaction.onerror = function(event) {
      db.close();
      console.error("IndexedDB error:", event.target.error);
      reject(event.target.error);
      
    };
  });
});
};


export function delete_object(storeName, key) {
  return new Promise(function(resolve, reject) {
    connectToIndexedDB().then(
      (db)=> {

        console.log("key in delete object:", key);
        console.log("store name: ", storeName);
        const transaction = db.transaction(storeName, "readwrite");
        const store = transaction.objectStore(storeName);
      
        const deleteRequest = store.delete(key);
    
        deleteRequest.onsuccess = function(event) {
        console.log("Object deleted successfully:", event);
        };
    
        deleteRequest.onerror = function(event) {
        console.error("Error deleting object:", event.target.error);
        };
    
        transaction.oncomplete = function() {
         
          resolve("success");
          db.close();
        };
        transaction.onerror = function(event) {console.log(event); reject(event.target.error);db.close();};
      }
    ).catch(
      (error)=> {console.log(error);}
    );
    });
  }
  
  export async function getAllObjects(storeName) {
    
    console.log("trying to get all objects");
    return connectToIndexedDB().then(
      (db) => {
        const transaction = db.transaction(storeName, 'readonly');
    const objectStore = transaction.objectStore(storeName);
    const request = objectStore.getAll();
  
    return new Promise((resolve, reject) => {
      request.onsuccess = (event) => {
        resolve(event.target.result);
      };
      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
    db.close();
      }
    ).catch((error)=> {console.log(error);});
   
  }
  
  export function  update_object(storeName, Object) {
    return new Promise(function(resolve, reject) {
      connectToIndexedDB().then(
        (db)=> {
  
         
          const transaction = db.transaction(storeName, "readwrite");
          const store = transaction.objectStore(storeName);
        
          const updateRequest = store.put(Object);
      
          updateRequest.onsuccess = function(event) {
          console.log("Object updated successfully:", event);
          };
      
          updateRequest.onerror = function(event) {
          console.error("Error deleting object:", event.target.error);
          };
      
          transaction.oncomplete = function() {
           
            resolve("success");
            db.close();
          };
          transaction.onerror = function(event) {console.log(event); reject(event.target.error);db.close();};
        }
      ).catch(
        (error)=> {console.log(error);}
      );
      });
  }


  export function get_object(storeName, id) {
    return new Promise(function(resolve, reject) {
      connectToIndexedDB().then(
        (db)=> {
  
         
          const transaction = db.transaction(storeName, "readonly");
          const store = transaction.objectStore(storeName);
          console.log("id: ", id);
          const getRequest = store.get(id);
      
          getRequest.onsuccess = function(event) {
          console.log("Object retrieved successfully:", getRequest.result);
          }
      
          getRequest.onerror = function(event) {
            console.log(event.target.error);
            
          };
      
          transaction.oncomplete = function() {
            db.close();
            if(getRequest.result == undefined) {
              reject("error");
            }
            else{
            resolve(getRequest.result);
            }
                      
           
          };
          transaction.onerror = function(event) {console.log(event); reject(event.target.error);db.close();};
        }
      ).catch(
        (error)=> {console.log(error);}
      );
      });
  }

  export function getAllIndex(storeName, indexName, keys) {
    console.log("inside getAllIndex");
    return new Promise(function(resolve, reject) {
      connectToIndexedDB().then(
        (db)=> {
          const transaction = db.transaction(storeName, "readonly");
          const store = transaction.objectStore(storeName);
          let index = store.index(indexName);
          let getRequest = index.getAll(keys);
      
          getRequest.onsuccess = function(event) {
          console.log("Object retrieved successfully:", getRequest.result);
          if(getRequest.result == undefined) {
            reject("error");
          }
          else
          resolve(getRequest.result);
          };
      
          getRequest.onerror = function(event) {
            console.log(event.target.error);
            reject("error");
          };
      
          transaction.oncomplete = function() {
           
            resolve("success");
            db.close();
          };
          transaction.onerror = function(event) {console.log(event); reject(event.target.error);db.close();};
        }
      ).catch(
        (error)=> {console.log(error);}
      );
      });
  }