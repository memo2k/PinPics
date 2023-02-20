import React from 'react'

const DropFileInput = ({ image, setImage }) => {
    const resetFieldStyle = () => {
        document.querySelector(".form__field-file")
        .style.backgroundColor = "";
    }

    const handleDragOver = (e) => {
        e.preventDefault();
        document.querySelector(".form__field-file")
        .style.backgroundColor = "#bfdbc7";
    };
    
    const handleDrop = (e) => {
        e.preventDefault();
        const droppedImage = e.dataTransfer.files[0];
        resetFieldStyle();
        setImage(droppedImage);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        resetFieldStyle();
    };
    
    const handleRemoveImage = () => {
        setImage(null);
    };

    const browseFilesHandler = (e) => {
        e.preventDefault();
        document.getElementById("file").click();
    }

  return (
    <div className="form__row">
        <div className="form__field-file"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        >
            {image ? (
                <div className='form__field-image'>
                    <img src={URL.createObjectURL(image)} />

                    <button onClick={handleRemoveImage} className="btn btn--remove"><i className="fa-solid fa-xmark fa-xl"></i></button>
                </div>
            ) : (
                <div>
                    <div className="form__field-icon">
                        <i className="fa-solid fa-images fa-2xl"></i>
                    </div>

                    <h2>Drag and drop an image, or </h2>
                    <div className="form__field-button">
                        <button className="btn btn--browse" onClick={browseFilesHandler}>Browse</button>
                    </div>

                    <input id="file" type="file" onChange={(e) => {setImage(e.target.files[0])}} className="field" hidden />
                </div>
            )}
        </div>
    </div>
  )
}

export default DropFileInput