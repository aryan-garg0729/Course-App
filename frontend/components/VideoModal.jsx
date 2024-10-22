import React from "react";
import Modal from 'react-modal';

const VideoModal = ({ isModalOpen, setIsModalOpen, formData, handleChange, handleSubmit, title }) => {
  return (
    <Modal
    isOpen={isModalOpen}
    onRequestClose={() => setIsModalOpen(false)}
    contentLabel={title}
    className="modal-content"
    overlayClassName="modal-overlay"
  >
    <h2 className="text-xl font-bold mb-4">{title}</h2>

    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Name
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="border rounded w-full py-2 px-3 text-gray-700"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Duration
        </label>
        <input
          type="text"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          className="border rounded w-full py-2 px-3 text-gray-700"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          URL
        </label>
        <input
          type="text"
          name="url"
          value={formData.url}
          onChange={handleChange}
          className="border rounded w-full py-2 px-3 text-gray-700"
          required
        />
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          onClick={() => setIsModalOpen(false)}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save
        </button>
      </div>
    </form>
  </Modal>
  );
};

export default VideoModal;
