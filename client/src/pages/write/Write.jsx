import { useContext, useState } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";

export default function Write() {
  const [name, setName] = useState("");
  const [fee, setFee] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    console.log(user.accessToken);
    e.preventDefault();
    const newCourse = {
      name,
      description,
      fee,
    };
    // console.log(newCourse);
    console.log(user.isAdmin);

    if (file) {
      const data = new FormData();
      const filename = file.name;
      data.append("name", filename);
      data.append("file", file);
      newCourse.photo = filename;
      console.log(data);
      try {
        await axios.post(
          "https://ictak-project.herokuapp.com/api/upload",
          data
        );
      } catch (err) {}
    }
    try {
      const res = await axios.post(
        "https://ictak-project.herokuapp.com/api/course",
        newCourse,
        {
          headers: { token: "Bearer " + user.accessToken },
        }
      );
      console.log(res);
      window.location.replace("/");
    } catch (err) {}
  };

  return (
    <div className="write">
      <div>
        {file && (
          <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
        )}
        <form className="writeForm" onSubmit={handleSubmit}>
          <div className="writeFormGroupTop">
            <label htmlFor="fileInput">
              <i className="writeIcon fas fa-plus">Add image</i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <input
              type="text"
              placeholder="Title"
              className="writeInput"
              autoFocus={true}
              onChange={(e) => setName(e.target.value)}
            />
            <button className="writeSubmit" type="submit">
              Publish
            </button>
          </div>{" "}
          <div className="col">
            {" "}
            <div className="writeFormGroupDown">
              <input
                type="text"
                placeholder="Fee"
                className="writeInput  writeFee"
                autoFocus={true}
                onChange={(e) => setFee(e.target.value)}
              />
            </div>
            <div className="writeFormGroupDown">
              <textarea
                placeholder="description..."
                type="text"
                className="writeInput writeText"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
