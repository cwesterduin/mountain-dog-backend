import React, { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import * as formStyles from "../form.module.css";
import { useParams } from "@reach/router";
import { getData } from "../../requests";
import Autocomplete from "@material-ui/lab/Autocomplete";

function Trip() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    Name: "",
    Description: "",
    TripMediaID: null,
  });
  const [imageOptions, setImageOptions] = useState([])
  useEffect(() => {
    async function fetchFormState() {
      const data = await getData(`trips/${id}`);
      setFormData({
        Name: data.Name,
        Description: data.Description,
        TripMediaID: {MediaID: data.TripMediaID},
      });

    }
    async function fetchImageOptions() {
        const data = await getData(`media`);
        setImageOptions(
            data.results
        );
      }
    id && fetchFormState();
    fetchImageOptions()
  }, []);

  function handleInputChange(e){
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setFormData({
        ...formData,
      [name]: value
    });
  }

  return (
    <form className={formStyles.form} noValidate autoComplete="off">
      <TextField
        id="standard-basic"
        label="Name"
        name="Name"
        value={formData.Name}
        onChange={handleInputChange}
      />
      <TextField
        id="standard-basic"
        label="Description"
        name="Description"
        multiline
        rows={4}
        rowsMax={Infinity}
        value={formData.Description}
        onChange={handleInputChange}
      />
       <Autocomplete
        id="image-select"
        value={formData.TripMediaID}
        renderOption={(option) => (
            <>
            <img src={`https://alfie192345.s3.eu-west-2.amazonaws.com/images/${option.Path}`} height={48} width={48} />
            <div>{option.MediaID} {option.Path}</div>
            </>
        )}
        onChange={(e, newValue) =>
            setFormData({ ...formData, TripMediaID: newValue })
          }

        options={imageOptions}
        getOptionLabel={(option) => String(option.MediaID)}
        renderInput={(params) => (
          <TextField {...params} label="Trip Image" />
        )}
      />
      <Button variant="contained" color="primary" type="submit">
        {id ? "Save" : "submit"}
      </Button>
    </form> 
  );
}

export default Trip;
