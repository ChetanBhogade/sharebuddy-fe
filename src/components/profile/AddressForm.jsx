import { Grid, TextField } from "@mui/material";

function AddressForm({ addressFormData, setAddressFormData }) {
  return (
    <form style={{ marginTop: 12 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="line1"
            label="Line 1"
            variant="outlined"
            fullWidth
            autoComplete="line1"
            type="text"
            value={addressFormData.line1}
            onChange={(e) => {
              setAddressFormData({
                ...addressFormData,
                line1: e.target.value,
              });
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="line2"
            label="Line 2"
            variant="outlined"
            fullWidth
            autoComplete="line2"
            type="text"
            value={addressFormData.line2}
            onChange={(e) => {
              setAddressFormData({
                ...addressFormData,
                line2: e.target.value,
              });
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="landmark"
            label="Landmark"
            variant="outlined"
            fullWidth
            autoComplete="landmark"
            type="text"
            value={addressFormData.landmark}
            onChange={(e) => {
              setAddressFormData({
                ...addressFormData,
                landmark: e.target.value,
              });
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="city"
            label="City"
            variant="outlined"
            fullWidth
            autoComplete="city"
            type="text"
            value={addressFormData.city}
            onChange={(e) => {
              setAddressFormData({
                ...addressFormData,
                city: e.target.value,
              });
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="state"
            label="State"
            variant="outlined"
            fullWidth
            autoComplete="state"
            type="text"
            value={addressFormData.state}
            onChange={(e) => {
              setAddressFormData({
                ...addressFormData,
                state: e.target.value,
              });
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="country"
            label="Country"
            variant="outlined"
            fullWidth
            autoComplete="country"
            type="country"
            value={addressFormData.country}
            onChange={(e) => {
              setAddressFormData({
                ...addressFormData,
                country: e.target.value,
              });
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="pincode"
            label="Pincode"
            variant="outlined"
            fullWidth
            autoComplete="pincode"
            type="text"
            value={addressFormData.pincode}
            onChange={(e) => {
              setAddressFormData({
                ...addressFormData,
                pincode: e.target.value,
              });
            }}
          />
        </Grid>
      </Grid>
    </form>
  );
}

export default AddressForm;
