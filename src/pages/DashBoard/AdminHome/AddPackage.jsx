import { useForm } from "react-hook-form";
import { useState } from "react";
import Swal from "sweetalert2";
// import useAxiosPublic from "../hooks/useAxiosPublic";
// import useAuth from "../hooks/useAuth";
// import useUser from "../hooks/useUser";
import { useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
const cloudName = import.meta.env.VITE_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_PRESET;

const AddPackage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [previewGallery, setPreviewGallery] = useState([]);
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic()
  const [included, setIncluded] = useState([]);
  const [newIncluded, setNewIncluded] = useState("");
  const [excluded, setExcluded] = useState([]);
  const [newExcluded, setNewExcluded] = useState("");
  const [tourAmenities, setTourAmenities] = useState([]);
  const [newTourAmenities, setNewTourAmenities] = useState("");
  const [tourPlans, setTourPlans] = useState([]);
  const [newTourPlans, setNewTourPlans] = useState("");
  const [extraFacilities, setExtraFacilities] = useState([]);
  const [newExtraFacilities, setNewExtraFacilities] = useState("");
  const [tourLocation, setTourLocation] = useState([]);
  const [newTourLocation, setNewTourLocation] = useState("");
  // const { user } = useAuth();
  // const [userData] = useUser();
  const addIncluded = () => {
    if (newIncluded) {
      setIncluded([...included, newIncluded]);
      setNewIncluded("");
    }
  };

  const addExcluded = () => {
    if (newExcluded) {
      setExcluded([...excluded, newExcluded]);
      setNewExcluded("");
    }
  };

  const addTourAmenities = () => {
    if (newTourAmenities) {
      setTourAmenities([...tourAmenities, newTourAmenities]);
      setNewTourAmenities("");
    }
  };

  const addTourPlans = () => {
    if (newTourPlans) {
      setTourPlans([...tourPlans, newTourPlans]);
      setNewTourPlans("");
    }
  };

  const addExtraFacilities = () => {
    if (newExtraFacilities) {
      setExtraFacilities([...extraFacilities, newExtraFacilities]);
      setNewExtraFacilities("");
    }
  };

  const addTourLocation = () => {
    if (newTourLocation) {
      setTourLocation([...tourLocation, newTourLocation]);
      setNewTourLocation("");
    }
  };

  const removeIncluded = (index) => {
    setIncluded(included.filter((_, i) => i !== index));
  };

  const removeExcluded = (index) => {
    setExcluded(excluded.filter((_, i) => i !== index));
  };

  const removeTourAmenities = (index) => {
    setTourAmenities(tourAmenities.filter((_, i) => i !== index));
  };

  const removeTourPlans = (index) => {
    setTourPlans(tourPlans.filter((_, i) => i !== index));
  };

  const removeExtraFacilities = (index) => {
    setExtraFacilities(extraFacilities.filter((_, i) => i !== index));
  };

  const removeTourLocation = (index) => {
    setTourLocation(tourLocation.filter((_, i) => i !== index));
  };

  // Handle Photo Gallery Previews
  const handleGalleryPreview = (event) => {
    const files = Array.from(event.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewGallery(previews);
  };

  // Form Submission
  const handleFormSubmit = async (data) => {
    try {
      // Upload single photo
      const singlePhoto = data.photo[0];
      const singlePhotoFormData = new FormData();
      singlePhotoFormData.append("file", singlePhoto);
      singlePhotoFormData.append("upload_preset", uploadPreset);

      const singlePhotoResponse = await axiosPublic.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        singlePhotoFormData
      );

      const uploadedPhoto = singlePhotoResponse.data.secure_url;

      // Upload photoGallery images
      const imageFiles = Array.from(data.photoGallery);
      const uploadPromises = imageFiles.map((file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);
        return axiosPublic.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData
        );
      });

      // Wait for all uploads to complete
      const uploadResponses = await Promise.all(uploadPromises);
      const uploadedGallery = uploadResponses.map((res) => res.data.secure_url);

      // Prepare the package data
      const packageData = {
        photo: uploadedPhoto, // Use the uploaded single photo URL
        photoGallery: uploadedGallery, // Use the gallery URLs
        tripTitle: data.tripTitle,
        price: data.price,
        duration: data.duration,
        groupSize: data.groupSize,
        minAge: data.minAge,
        tourType: data.tourType,
        included: included,
        excluded: excluded,
        tourAmenities: tourAmenities,
        transportation: data.transportation,
        tourPlans: tourPlans,
        overview: data.overview,
        challenges: data.challenges,
        extraFacilities: extraFacilities,
        tourLocation: tourLocation,
      };

      // Send package data to the backend
      await axiosSecure.post("/packages", packageData).then((res) => {
        if (res.data.insertedId) {
          reset();
          queryClient.invalidateQueries({ queryKey: ["packages"] });
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Package Added Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Failed to add the package",
        text: "An error occurred while adding your package.",
      });
    }
  };

  return (
    <div className="min-h-screen mt-12 py-10 px-4 md:px-16 w-full">
      <h2 className="text-4xl font-bold text-center text-primary mb-8">
        Add A New Package
      </h2>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="space-y-6 p-8 bg-white rounded shadow-md mx-auto w-full"
      >
        {/* Main Photo Upload */}
        <div className="mb-4">
          <label className="label">
            <span className="label-text">Main Photo</span>
          </label>
          <input
            type="file"
            {...register("photo", { required: true })}
            className="file-input file-input-bordered w-full"
          />
        </div>

        {/* Photo Gallery */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-xl text-black font-semibold">
              Photo Gallery
            </span>
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            {...register("photoGallery", {
              required: "Please upload at least one image",
            })}
            className="file-input file-input-bordered w-full rounded-none border border-primary"
            onChange={handleGalleryPreview}
          />
          {errors.photoGallery && (
            <span className="text-red-500 text-sm mt-1">
              {errors.photoGallery.message}
            </span>
          )}
        </div>

        {/* Photo Gallery Previews */}
        {previewGallery.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {previewGallery.map((src, index) => (
              <img
                key={index}
                src={src}
                alt="Preview"
                className="h-24 w-24 object-cover rounded-md shadow-sm"
              />
            ))}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-5">
          {/* Trip Title */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-xl text-black font-semibold">
                Trip Title
              </span>
            </label>
            <input
              type="text"
              {...register("tripTitle", { required: "Trip title is required" })}
              className="input input-bordered w-full rounded-none border border-primary"
              placeholder="Enter the trip title"
            />
            {errors.tripTitle && (
              <span className="text-red-500 text-sm mt-1">
                {errors.tripTitle.message}
              </span>
            )}
          </div>
          {/* Trip Type */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-xl text-black font-semibold">
                Trip Type
              </span>
            </label>
            <input
              type="text"
              {...register("tourType", { required: "Tour Type is required" })}
              className="input input-bordered w-full rounded-none border border-primary"
              placeholder="Enter the tour type"
            />
            {errors.tourType && (
              <span className="text-red-500 text-sm mt-1">
                {errors.tourType.message}
              </span>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Price */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-xl text-black font-semibold">
                Price ($)
              </span>
            </label>
            <input
              type="number"
              {...register("price", { required: "Price is required" })}
              className="input input-bordered w-full rounded-none border border-primary"
              placeholder="Enter price per person"
            />
            {errors.price && (
              <span className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </span>
            )}
          </div>

          {/* Duration */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-xl text-black font-semibold">
                Duration
              </span>
            </label>
            <input
              type="text"
              {...register("duration", { required: "Duration is required" })}
              className="input input-bordered w-full rounded-none border border-primary"
              placeholder="e.g., 3 Days, 2 Nights"
            />
            {errors.duration && (
              <span className="text-red-500 text-sm mt-1">
                {errors.duration.message}
              </span>
            )}
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {/* Group Size */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-xl text-black font-semibold">
                Group Size
              </span>
            </label>
            <input
              type="text"
              {...register("groupSize", { required: "Group Size is required" })}
              className="input input-bordered w-full rounded-none border border-primary"
              placeholder="e.g., Up to 10 guests"
            />
            {errors.groupSize && (
              <span className="text-red-500 text-sm mt-1">
                {errors.groupSize.message}
              </span>
            )}
          </div>
          {/*minAge */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-xl text-black font-semibold">
                Minimum Age
              </span>
            </label>
            <input
              type="number"
              {...register("minAge", { required: "Age is required" })}
              className="input input-bordered w-full rounded-none border border-primary"
              placeholder="Enter Minimum Age"
            />
            {errors.minAge && (
              <span className="text-red-500 text-sm mt-1">
                {errors.minAge.message}
              </span>
            )}
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {[
            {
              label: "Tour Location",
              state: newTourLocation,
              setState: setNewTourLocation,
              items: tourLocation,
              add: addTourLocation,
              remove: removeTourLocation,
            },
            {
              label: "Extra Facilities",
              state: newExtraFacilities,
              setState: setNewExtraFacilities,
              items: extraFacilities,
              add: addExtraFacilities,
              remove: removeExtraFacilities,
            },
            {
              label: "Tour Plans",
              state: newTourPlans,
              setState: setNewTourPlans,
              items: tourPlans,
              add: addTourPlans,
              remove: removeTourPlans,
            },
            {
              label: "Tour Amenities",
              state: newTourAmenities,
              setState: setNewTourAmenities,
              items: tourAmenities,
              add: addTourAmenities,
              remove: removeTourAmenities,
            },
            {
              label: "Excluded",
              state: newExcluded,
              setState: setNewExcluded,
              items: excluded,
              add: addExcluded,
              remove: removeExcluded,
            },
            {
              label: "Included",
              state: newIncluded,
              setState: setNewIncluded,
              items: included,
              add: addIncluded,
              remove: removeIncluded,
            },
          ].map(({ label, state, setState, items, add, remove }, index) => (
            <div className="form-control mb-4" key={index}>
              <label className="label-text text-xl text-black font-semibold">
                {label}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder={`Add a ${label.toLowerCase()}`}
                  className="flex-1 input input-bordered w-full md:w-auto rounded-none border border-primary"
                />
                <button
                  type="button"
                  onClick={add}
                  className="btn border-none bg-primary text-light rounded-none hover:text-primary font-bold"
                >
                  Add
                </button>
              </div>
              <ul className="mt-2">
                {items.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between items-center bg-gray-100 p-2 rounded mb-1"
                  >
                    {item}
                    <button
                      type="button"
                      onClick={() => remove(idx)}
                      className="btn btn-sm btn-error border-none text-light rounded-none hover:text-primary font-bold"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-xl text-black font-semibold">
                Challenges
              </span>
            </label>
            <input
              type="text"
              {...register("challenges", {
                required: "Challenges field is required",
              })}
              className="input input-bordered w-full rounded-none border border-primary"
              placeholder="e.g., High altitude, extreme weather"
            />
            {errors.challenges && (
              <span className="text-red-500 text-sm mt-1">
                {errors.challenges.message}
              </span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-xl text-black font-semibold">
                Overview
              </span>
            </label>
            <input
              type="text"
              {...register("overview", { required: "Overview is required" })}
              className="input input-bordered w-full rounded-none border border-primary"
              placeholder="e.g., A thrilling trek across mountain trails"
            />
            {errors.overview && (
              <span className="text-red-500 text-sm mt-1">
                {errors.overview.message}
              </span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-xl text-black font-semibold">
                Transportation
              </span>
            </label>
            <input
              type="text"
              {...register("transportation", {
                required: "Transportation is required",
              })}
              className="input input-bordered w-full rounded-none border border-primary"
              placeholder="e.g., By bus, train, or private car"
            />
            {errors.transportation && (
              <span className="text-red-500 text-sm mt-1">
                {errors.transportation.message}
              </span>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="form-control">
          <button
            type="submit"
            className="btn bg-primary text-white rounded-none hover:bg-secondary w-full font-bold"
          >
            Add Package
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPackage;
