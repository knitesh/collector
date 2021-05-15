// import firebase from "firebase/app";
import { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
// db = firebase.firestore(app);

// // [START get_all_users]
// db.collection("posts")
//   .get()
//   .then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//       console.log(`${doc.id} => ${doc.data()}`);
//     });
//   });

import "firebase/database";

const getPosts = async (db) => {
  let data = [];
  await db
    .collection("posts")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const post = {
          id: doc.id,
          ...doc.data(),
        };
        data.push(post);
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
      });
    });

  return data;
  //   db.ref("posts").on("value", (snapshot) => {
  //     const vals = snapshot.val();
  //     let _records = [];
  //     for (var key in vals) {
  //       _records.push({
  //         ...vals[key],
  //         id: key,
  //       });
  //     }
  //     // setTodos is a Redux action that would update the todo store
  //     // to the _records payload
  //     console.log(_records);
  //   });
};
const Posts = ({ app }) => {
  const db = firebase.firestore(app);
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    const posts = getPosts(db).then((data) => setCollection(data));
    console.log(posts);
  }, [db]);

  return (
    <>
      {collection
        ? collection.map((post) => (
            <div key={post.id}>
              <h1>{post.postTitle}</h1>
            </div>
          ))
        : null}
    </>
  );
};

export default Posts;
