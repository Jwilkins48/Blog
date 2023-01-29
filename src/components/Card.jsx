import { getAuth } from "firebase/auth";

function Card({ post, id, onDelete, onEdit }) {
  const auth = getAuth();
  //Format timestamp
  const date = Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(post.timestamp.seconds * 1000);

  return (
    <div
      className={
        //Only show current users posts
        post.userRef === auth.currentUser?.uid
          ? "card w-86  mx-4 h-86 bg-base-200 shadow-lg  p-2 py-4 my-5 mb-8 relative animate__animated animate__fadeIn"
          : "hidden"
      }
    >
      <div className="ml-2 lg:w-[56rem] w-80 relative h-full">
        <header>
          <h1 className="text-4xl text-secondary font-bold">{post.title}</h1>
        </header>

        <div className="divider mt-0"></div>

        <div className="flex flex-col">
          <h3 className="mb-10 wrap">{post.blogPost}</h3>
          <p className="absolute bottom-0 right-0  text-gray-400 text-xs">{`${date}`}</p>
        </div>
      </div>

      {/* Dropdown Start */}
      <div className="dropdown dropdown-end absolute right-5 top-5 text-lg text-orange-200">
        <label tabIndex={0} className="m-1 cursor-pointer">
          <i className="fa-solid fa-ellipsis" />
        </label>
        <ul
          tabIndex={0}
          className="border-2 border-accent dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <div className="flex flex-col items-start">
            <button
              className="flex justify-between w-full items-center"
              onClick={() => onDelete()}
            >
              <div className="ml-2">Delete</div>
              <i className="fa-solid mr-2 text-primary text-sm shadow fa-trash" />
            </button>

            {onEdit && (
              <button onClick={() => onEdit(id)} className="ml-2 mt-1">
                Edit
              </button>
            )}
          </div>
        </ul>
      </div>
      {/* Dropdown End */}
    </div>
  );
}

export default Card;
