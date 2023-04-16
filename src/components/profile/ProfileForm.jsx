import { Button, Grid, IconButton, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import React, { useContext, useEffect, useState } from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { PhotoCamera } from "@mui/icons-material";
import { GlobalContext } from "@/contexts/GlobalContext";
import DialogBox from "../common/DialogBox";
import AddressForm from "./AddressForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addUserAddress,
  getLoggedInUserDetails,
  getUserAddress,
  updateUserAddress,
  updateUserDetails,
} from "@/services/auth";
import { getErrorMessage } from "@/utils/commonFunctions";
import moment from "moment";
import { useRouter } from "next/router";

function ProfileForm() {
  const { user, setIsBackdropLoading, setSnackbar, setUser } =
    useContext(GlobalContext);

  const router = useRouter();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    mobile: "",
    dob: "",
    image: "-",
  });
  const [openAddressDialog, setOpenAddressDialog] = useState(false);
  const [addressFormData, setAddressFormData] = useState({
    user_id: "-",
    id: 1,
    line1: "",
    line2: "",
    city: "",
    state: "",
    country: "",
    landmark: "",
    pincode: "",
  });
  const [hasAddress, setHasAddress] = useState(false);

  const { data: userData } = useQuery({
    queryKey: ["getLoggedInUserDetails"],
    queryFn: getLoggedInUserDetails,
  });

  const { data: userAddress } = useQuery({
    queryKey: ["getUserAddress"],
    queryFn: getUserAddress,
    onSuccess: () => {
      setHasAddress(true);
    },
    onError: (error) => {
      console.log("getAllUsers on error: ", error);
      if (error?.response?.data?.code === 400) {
        setHasAddress(false);
      }
    },
  });

  const updateUserDetailsMutation = useMutation({
    mutationFn: (data) => updateUserDetails(data),
    onSuccess: (data) => {
      console.log(
        "updateUserDetailsMutation updateUserDetails on success: ",
        data
      );
      setSnackbar({
        isOpen: true,
        message: data?.response || "Form Submitted Successfully.",
        severity: "success",
      });
      setIsBackdropLoading(false);
      queryClient.invalidateQueries({ queryKey: ["getLoggedInUserDetails"] });
    },
    onError: (error) => {
      console.log(
        "updateUserDetailsMutation updateUserDetails on error: ",
        error
      );
      setSnackbar({
        isOpen: true,
        message: getErrorMessage(error),
        severity: "error",
      });
      setIsBackdropLoading(false);
    },
  });

  const addAddressMutation = useMutation({
    mutationFn: (data) => addUserAddress(data),
    onSuccess: (data) => {
      console.log("addAddressMutation addUserAddress on success: ", data);
      setSnackbar({
        isOpen: true,
        message: data?.response || "Form Submitted Successfully.",
        severity: "success",
      });
      setIsBackdropLoading(false);
    },
    onError: (error) => {
      console.log("addAddressMutation addUserAddress on error: ", error);
      setSnackbar({
        isOpen: true,
        message: getErrorMessage(error),
        severity: "error",
      });
      setIsBackdropLoading(false);
    },
  });

  const updateAddressMutation = useMutation({
    mutationFn: (data) => updateUserAddress(data),
    onSuccess: (data) => {
      console.log("updateAddressMutation updateUserAddress on success: ", data);
      setSnackbar({
        isOpen: true,
        message: data?.response || "Form Submitted Successfully.",
        severity: "success",
      });
      setIsBackdropLoading(false);
    },
    onError: (error) => {
      console.log("updateAddressMutation updateUserAddress on error: ", error);
      setSnackbar({
        isOpen: true,
        message: getErrorMessage(error),
        severity: "error",
      });
      setIsBackdropLoading(false);
    },
  });

  const formSubmit = (event) => {
    event.preventDefault();

    const newFormData = new FormData();
    newFormData.append("first_name", formData.firstName);
    newFormData.append("last_name", formData.lastName);
    if (user?.email !== formData.email) {
      newFormData.append("email", formData.email);
    }
    if (user?.mobile_number !== formData.mobile) {
      newFormData.append("mobile_number", formData.mobile);
    }

    newFormData.append(
      "dob",
      formData.dob ? moment(formData.dob).format("DD/MM/YYYY") : ""
    );
    if (formData.image !== "-") {
      newFormData.append("photo", formData.image);
    }

    console.log("Form submitted for update....", formData);
    updateUserDetailsMutation.mutate(newFormData);
  };

  const handleAddressFormSubmit = () => {
    console.log(
      "Handle address form submit with data: ",
      addressFormData,
      hasAddress
    );
    const defaultData = {
      user_id: "-",
      id: 1,
      line1: "",
      line2: "",
      city: "",
      state: "",
      country: "",
      landmark: "",
      pincode: "",
    };
    if (hasAddress) {
      if (
        JSON.stringify(userAddress?.response) !==
        JSON.stringify(addressFormData)
      ) {
        const newFormData = new FormData();
        for (const key of Object.keys(addressFormData)) {
          newFormData.append(key, addressFormData[key]);
        }
        updateAddressMutation.mutate(newFormData);
      } else {
        setSnackbar({
          isOpen: true,
          message: "No Changes Detected.",
          severity: "info",
        });
      }
    } else {
      if (JSON.stringify(addressFormData) !== JSON.stringify(defaultData)) {
        const newFormData = new FormData();
        for (const key of Object.keys(addressFormData)) {
          newFormData.append(key, addressFormData[key]);
        }
        addAddressMutation.mutate(newFormData);
      } else {
        setSnackbar({
          isOpen: true,
          message: "No Changes Detected.",
          severity: "info",
        });
      }
    }

    setOpenAddressDialog(false);
  };

  const handleRedirect = (userData) => {
    if (!userData) return;

    if (userData && userData.response) {
      console.log("setting user data is: ", userData?.response);
      setUser(userData?.response);
    }
    if (
      userData &&
      (!userData?.response?.is_mobile_number_verified ||
        !userData?.response?.is_email_verified)
    ) {
      router.push("/verify");
    }
  };

  useEffect(() => {
    handleRedirect(userData);
  }, [userData]);

  useEffect(() => {
    if (userAddress && userAddress.response) {
      setAddressFormData({ ...userAddress.response });
    }
  }, [userAddress]);

  useEffect(() => {
    console.log("User details: ", user);
    setFormData({
      email: user?.email || "",
      firstName: user?.first_name || "",
      lastName: user?.last_name || "",
      mobile: user?.mobile_number || "",
      dob: user?.dob || "",
      image: "-",
    });
  }, [user]);

  return (
    <div>
      <form onSubmit={formSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              id="firstName"
              label="First Name"
              variant="outlined"
              fullWidth
              autoComplete="firstName"
              type="text"
              value={formData.firstName}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  firstName: e.target.value,
                });
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="lastName"
              label="Last Name"
              variant="outlined"
              fullWidth
              autoComplete="lastName"
              type="text"
              value={formData.lastName}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  lastName: e.target.value,
                });
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="mobile"
              label="Mobile"
              variant="outlined"
              fullWidth
              autoComplete="mobile"
              type="number"
              value={formData.mobile}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  mobile: e.target.value,
                });
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              fullWidth
              autoComplete="email"
              type="email"
              disabled
              value={formData.email}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  email: e.target.value,
                });
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="Date Of Birth"
                value={formData.dob ? moment(formData.dob) : null}
                format="DD/MM/YYYY"
                onChange={(newValue) =>
                  setFormData({
                    ...formData,
                    dob: newValue,
                  })
                }
              />
            </LocalizationProvider>
          </Grid>
          <Grid
            xs={6}
            flexDirection={"row"}
            item
            container
            justifyContent="flex-start"
            alignItems="center"
          >
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input
                id="contained-button-file"
                hidden
                accept="image/*"
                type="file"
                onChange={(event) => {
                  console.log("onchange event: ", event.target.files[0]);
                  setFormData({
                    ...formData,
                    image: event.target.files[0],
                  });
                }}
              />
              <PhotoCamera />
            </IconButton>
            <label htmlFor="contained-button-file">
              <Button variant="text" color="primary" component="span">
                Update Image
              </Button>
            </label>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" fullWidth type="submit" color="primary">
              Update
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={() => setOpenAddressDialog(true)}
              variant="outlined"
              fullWidth
              color="primary"
            >
              Update Address
            </Button>
          </Grid>
        </Grid>
      </form>
      <DialogBox
        title={"Your Address"}
        open={openAddressDialog}
        handleClose={() => setOpenAddressDialog(false)}
        handleSubmit={handleAddressFormSubmit}
      >
        <AddressForm
          setAddressFormData={setAddressFormData}
          addressFormData={addressFormData}
        />
      </DialogBox>
    </div>
  );
}

export default ProfileForm;
