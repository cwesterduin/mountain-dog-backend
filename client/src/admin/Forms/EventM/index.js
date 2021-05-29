import React, { useState, useEffect } from "react";
import { TextField, Button, Typography } from "@material-ui/core";
import * as formStyles from "../form.module.css";
import { useParams } from "@reach/router";
import { getData } from "../../requests";
import Autocomplete from "@material-ui/lab/Autocomplete";

function EventM() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    Name: "",
    Description: "",
    EventMediaID: "",
    Date: "0000-00-00T00:00.000Z",
    DistanceKM: "",
    ElevationM: "",
    TripID: "",
    GPX: "",
  });
  const [imageOptions, setImageOptions] = useState([])
  const [tripOptions, setTripOptions] = useState([])

  useEffect(() => {
    async function fetchFormState() {
      const data = await getData(`events/${id}`);
      setFormData({
        Name: data.Name,
        Description: data.Description,
        EventMediaID: {MediaID: data.EventMediaID},
        Date: data.Date,
        DistanceKM: data.DistanceKM,
        ElevationM: data.ElevationM,
        TripID: {TripID: data.TripID},
        GPX: data.GPX ? {name: "uploaded"} : false
      });

    }
    async function fetchImageOptions() {
        const data = await getData(`media`);
        setImageOptions(
            data.results
        );
      }
      async function fetchTripOptions() {
        const data = await getData(`trips`);
        setTripOptions(
            data.results
        );
      }
    id && fetchFormState();
    fetchImageOptions()
    fetchTripOptions()
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

  const handleCapture = ({ target }) => {
    setFormData({
      ...formData,
    GPX: target.files[0]
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
        value={formData.EventMediaID}
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
          <TextField {...params} label="Event Image" />
        )}
      />
             <Autocomplete
        id="trip-select"
        value={formData.TripID}
        renderOption={(option) => (
            <>
            <div>{option.Name}</div>
            </>
        )}
        onChange={(e, newValue) =>
            setFormData({ ...formData, TripID: newValue })
          }

        options={tripOptions}
        getOptionLabel={(option) => String(option.TripID)}
        renderInput={(params) => (
          <TextField {...params} label="Related Trip" />
        )}
      />
      <TextField
        id="datetime-local"
        label="Date"
        name="Date"
        type="datetime-local"
        value={formData.Date.replace("Z","")}
        onChange={handleInputChange}
        InputLabelProps={{
        shrink: true,
        }}
      />
        <TextField
          id="elevation"
          name="ElevationM"
          label="Elevation M"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          value={formData.ElevationM}
          onChange={handleInputChange}
        />
        <TextField
          id="distance"
          name="DistanceKM"
          label="Distance KM"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          value={formData.DistanceKM}
          onChange={handleInputChange}
        />
  <input
  accept="image/*"
  style={{ display: 'none' }}
  id="raised-button-file"
  type="file"
  onChange={handleCapture}
/>
<label htmlFor="raised-button-file">
  <Button variant="contained" component="span">
    Upload GPX
  </Button>
  <Typography variant="caption" display="block" gutterBottom>
  {formData.GPX ? String(formData.GPX.name) : "none"}</Typography>
</label> 


      <Button variant="contained" color="primary" type="submit">
        {id ? "Save" : "submit"}
      </Button>
    </form> 
  );
}

export default EventM;
