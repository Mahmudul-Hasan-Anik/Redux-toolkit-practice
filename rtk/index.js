const store = require("./app/store");
const { fatchPost } = require("./features/posts/postSlice");

store.subscribe(() => {
  //   console.log(store.getState());
});

store.dispatch(fatchPost(2));
