import React, { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import * as formStyles from "../form.module.css";
import { useParams } from "@reach/router";
import { getData } from "../../requests";

function Trip() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    Name: "",
    Description: "",
  });
  useEffect(() => {
    async function fetchFormState() {
      const data = await getData(`trips/${id}`);
      setFormData({
        Name: data.Name,
        Description: data.Description,
      });
    }
    id && fetchFormState();
  }, []);
  return (
    <form className={formStyles.form} noValidate autoComplete="off">
      <TextField
        id="standard-basic"
        label="Name"
        value={formData.Name}
        onChange={(e) => setFormData({ ...formData, Name: e.target.input })}
      />
      <TextField
        id="standard-basic"
        label="Description"
        multiline
        rows={4}
        rowsMax={Infinity}
        value={formData.Description}
        onChange={(e) =>
          setFormData({ ...formData, Description: e.target.input })
        }
      />
      <Button variant="contained" color="primary" type="submit">
        {id ? "Save" : "submit"}
      </Button>
    </form>
  );
}

export default Trip;
