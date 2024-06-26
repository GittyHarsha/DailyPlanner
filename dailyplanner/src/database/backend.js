const DatabaseName = "myDatabase";
export function connectToIndexedDB() {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DatabaseName, 1);

    request.onerror = (event) => {
      reject(event.target.error);
    };

    request.onsuccess = (event) => {
    
      resolve(event.target.result);
    };
    request.onupgradeneeded = (event) => {
     
      const db=event.target.result;
     
  
      db.createObjectStore("Name", 
      {
        keyPath: 'name'
      });
      const MonthlyGoals = db.createObjectStore("MonthlyGoals", 
      {
        keyPath: 'id',
        autoIncrement: 'true'
      });
      db.createObjectStore("Priority", 
      {
        keyPath: 'date',
      });
      db.createObjectStore("Highlights", 
      {
        keyPath: 'date',
      });
      db.createObjectStore("Tasks", 
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
      MonthlyGoals.createIndex("MonthYearIndex", ['month', 'year']);
      
    
    }

  });
}


export function  add_object(storeName, newObject) {
  return new Promise((resolve, reject) => {
    connectToIndexedDB().then((db) => {
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    let success=true;

if(store.keyPath ==="id") {
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
   

      
      } else {
        // No objects in the store, add with ID 1
        store.add({ ...newObject, id: "1" });
  
      }
    };

    cursorRequest.onerror = function(event) {
     success=false;
  
    }
  }
  else {
   
    
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    store.add(newObject);
    transaction.onsuccess = (event)=> { db.close();resolve("success")}
    transaction.onerror = (event)=> {db.close();reject("error");}
   
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

      reject(event.target.error);
      
    };
  });
});
};


export function delete_object(storeName, key) {
  return new Promise(function(resolve, reject) {
    connectToIndexedDB().then(
      (db)=> {

  
        const transaction = db.transaction(storeName, "readwrite");
        const store = transaction.objectStore(storeName);
      
        const deleteRequest = store.delete(key);
    
        deleteRequest.onsuccess = function(event) {

        };
    
        deleteRequest.onerror = function(event) {
     
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

    return connectToIndexedDB().then(
      (db) => {
        const transaction = db.transaction(storeName, 'readonly');
    const objectStore = transaction.objectStore(storeName);
    const request = objectStore.getAll();
  
    return new Promise((resolve, reject) => {
      request.onsuccess = (event) => {
        if(!event.target.result) {
          db.close();
          reject("error");
        }
        else {
          db.close();
          resolve(event.target.result);
        }
       
      };
      request.onerror = (event) => {
        db.close();
        reject(event.target.error);
      };
    });
  
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
     
          };
      
          updateRequest.onerror = function(event) {
       
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
      
          const getRequest = store.get(id);
      
          getRequest.onsuccess = function(event) {
        
          }
      
          getRequest.onerror = function(event) {
         
            
          };
      
          transaction.oncomplete = function() {
            db.close();
            if(getRequest.result === undefined) {
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

    

    return new Promise(function(resolve, reject) {
      connectToIndexedDB().then(
        (db)=> {
          const transaction = db.transaction(storeName, "readonly");
          const store = transaction.objectStore(storeName);
          let index = store.index(indexName);
          let getRequest = index.getAll(keys);
      
          getRequest.onsuccess = function(event) {
          console.log(storeName + " Object retrieved successfully:", getRequest.result+ "   with keys: ", keys);
         
          if(getRequest.result===undefined || getRequest.result.length===0 ) {
            console.log("get request is empty");
           
         
          }
          else {
           console.log("getrequest is not empty");
          
           
          }
          
         
          };
      
          getRequest.onerror = function(event) {
            console.log("get request error");
          
            reject("error");
          };
      
          transaction.oncomplete = function() {
            if(getRequest.result.length >0) {
              resolve(getRequest.result);
       
            }
            else {
             
              reject("error");
            }
            db.close();
          };
          transaction.onerror = function(event) {console.log(event); db.close();};
        }
      ).catch(
        (error)=> {console.log("error opening database");}
      );
      });
  }