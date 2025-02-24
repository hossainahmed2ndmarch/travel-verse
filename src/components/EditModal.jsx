import { useForm } from "react-hook-form";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const EditModal = ({ setModalOpen, isModalOpen, userData, refetch }) => {
  const { register, handleSubmit } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const handleEdit = async (data) => {
    try {
      // Prepare the image for upload
      const imageFile = data.photo[0];
      const formData = new FormData();
      formData.append("image", imageFile);

      // Upload image to ImgBB
      const imageResponse = await axiosPublic.post(image_hosting_api, formData);

      if (imageResponse.data.success) {
        const updatedProfileData = {
          name: data.name,
          photo: imageResponse.data.data.display_url,
        };

        // Update the user profile in backend
        await axiosSecure
          .patch(`/users/${userData?._id}`, updatedProfileData)
          .then((res) => {
            // console.log(res.data);
            if (res.data.modifiedCount > 0) {
              refetch();
              setModalOpen(false);
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Updated Profile Successfully",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
      }
    } catch (error) {
      // console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box relative bg-secondaryBg">
        <button
          onClick={() => setModalOpen(false)}
          className="btn btn-sm btn-circle absolute right-2 top-2 text-primaryText"
        >
          ✕
        </button>
        <h3 className="font-bold text-2xl mb-4 text-center text-primaryText">
          Edit Your Profile
        </h3>
        <form onSubmit={handleSubmit(handleEdit)} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-xl text-secondaryText font-semibold">
                Name
              </span>
            </label>
            <input
              type="text"
              defaultValue={userData?.name}
              {...register("name")}
              className="input w-full md:w-auto rounded-none border border-primaryText bg-secondaryBg text-secondaryText"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-xl text-secondaryText font-semibold">
                Photo
              </span>
            </label>
            <input
              type="file"
              {...register("photo")}
              className="file-input file-input-bordered w-full md:w-auto rounded-none border border-primaryText bg-secondaryBg text-secondaryText"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-xl text-secondaryText font-semibold">
                Email
              </span>
            </label>
            <input
              type="email"
              defaultValue={userData?.email}
              className="input w-full md:w-auto rounded-none border border-primaryText bg-secondaryBg text-secondaryText"
              disabled
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-xl text-secondaryText font-semibold">
                Role
              </span>
            </label>
            <input
              type="text"
              defaultValue={userData?.role || "Tourist"}
              className="input w-full md:w-auto rounded-none border border-primaryText bg-secondaryBg text-secondaryText"
              disabled
            />
          </div>
          <div className="modal-action">
            <button
              type="submit"
              className="btn border-none bg-primaryText text-white rounded-none hover:text-white w-full"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
