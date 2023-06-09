const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const videoComments = document.querySelector(".video__comments ul");
const deleteIcon = document.querySelector(".delete__icon");

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");

  newComment.dataset.id = id;
  newComment.className = "video__comment";

  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const deleteIcon = document.createElement("span");
  deleteIcon.innerText = "❌";
  deleteIcon.className = "delete__icon";

  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(deleteIcon);
  videoComments.prepend(newComment);

  deleteIcon.addEventListener("click", handleDelete);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;

  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};

const handleDelete = async (event) => {
  const deleteComment = event.target.parentElement;

  const {
    dataset: { id },
  } = event.target.parentElement;

  const videoId = videoContainer.dataset.id;

  const response = await fetch(`/api/videos/${videoId}/comment/delete`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ commentId: id }),
  });
  if (response.status === 200) {
    deleteComment.remove();
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
  deleteIcon.addEventListener("click", handleDelete);
}

// if (deleteIcon) {
//   deleteIcon.forEach((icon) => icon.addEventListener("click", handleDelete));
// }
