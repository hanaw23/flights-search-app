"use client";

import { useState, useEffect } from "react";
import { Card, Box, Select, MenuItem, IconButton, InputLabel, FormControl, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import BabyChangingStationIcon from "@mui/icons-material/BabyChangingStation";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { SearchInputComponent } from "@flights-search-app/components";

const today = dayjs();

interface SearchFlightFormProps {
  currentUserLocation?: {
    value: {
      skyId: string;
      entityId: string;
    };
    label: string;
  };
  locale?: string;
  userConfigData?: Config;
  submit: (params: FlightsSearchParams) => void;
}

const classOptions = [
  { value: "economy", label: "Economy" },
  { value: "premium_economy", label: "Premium Economy" },
  { value: "business", label: "Business" },
  { value: "first", label: "First" },
];

const SearchFlightForm = (props: SearchFlightFormProps) => {
  const [from, setFrom] = useState();
  const [fromDisplay, setFromDisplay] = useState();
  const [to, setTo] = useState("");
  const [toDisplay, setToDisplay] = useState("");
  const [departDate, setDepartDate] = useState<Dayjs | null>(today);
  const [travelClass, setTravelClass] = useState("economy");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    if (from && from !== props?.currentUserLocation?.value) {
      setFrom(from);
    } else if (props?.currentUserLocation?.value && !from) {
      setFrom(props?.currentUserLocation?.value);
    }
  }, [from, props?.currentUserLocation?.value]);

  const handleSubmit = () => {
    setShowErrors(true);
    if (!from || !to || !departDate) return;

    const formattedDepartDate = dayjs(departDate).format("YYYY-MM-DD");
    const params = {
      originSkyId: from.skyId,
      destinationSkyId: to.skyId,
      originEntityId: from.entityId,
      destinationEntityId: to.entityId,
      date: formattedDepartDate,
      cabinClass: travelClass,
      adults: adults,
      children: children,
      infants: infants,
      sortBy: "best",
      currency: props?.userConfigData?.currency,
      market: props?.userConfigData?.market,
      countryCode: props?.userConfigData?.countryCode,
    } as FlightsSearchParams;
    props.submit(params);
  };

  return (
    <Box component="form" noValidate autoComplete="off" sx={{ display: "flex", justifyContent: "center" }}>
      <Card
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          width: "100%",
          flexWrap: "wrap",
          gap: 2,
          backgroundColor: "transparent",
          boxShadow: "none",
        }}
      >
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, alignItems: "center", flexGrow: 1 }}>
          <SearchInputComponent
            label="From"
            onSelect={(airport) => {
              setFrom(airport.value);
              setFromDisplay(airport.label);
            }}
            error={showErrors && !from}
            helperText={showErrors && !from ? "Cannot be empty" : ""}
            initialValue={{
              label: props?.currentUserLocation?.label,
              value: props?.currentUserLocation?.value,
            }}
            locale={props?.locale}
          />
          <SearchInputComponent
            label="To"
            onSelect={(airport) => {
              setTo(airport.value);
              setToDisplay(airport.label);
            }}
            error={showErrors && !to}
            helperText={showErrors && !to ? "Cannot be empty" : ""}
            locale={props?.locale}
          />
          <DatePicker
            label="Depart"
            value={departDate}
            onChange={(newValue) => setDepartDate(newValue)}
            minDate={today}
            slotProps={{
              textField: {
                error: showErrors && !departDate,
                helperText: showErrors && !departDate ? "Date is required" : "",
              },
            }}
          />
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="class-label">Class</InputLabel>
            <Select labelId="class-label" value={travelClass} label="Class" onChange={(e) => setTravelClass(e.target.value)}>
              {classOptions.map((el) => (
                <MenuItem key={el.value} value={el.value}>
                  {el.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box>
            <Typography variant="caption" display="flex" alignItems="center" gap={0.5}>
              <PersonIcon fontSize="small" /> Adults
            </Typography>
            <Box display="flex" alignItems="center">
              <IconButton onClick={() => setAdults((v) => Math.max(1, v - 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography>{adults}</Typography>
              <IconButton onClick={() => setAdults((v) => v + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
          </Box>

          <Box>
            <Typography variant="caption" display="flex" alignItems="center" gap={0.5}>
              <ChildCareIcon fontSize="small" /> Children
            </Typography>
            <Box display="flex" alignItems="center">
              <IconButton onClick={() => setChildren((v) => Math.max(0, v - 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography>{children}</Typography>
              <IconButton onClick={() => setChildren((v) => v + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
          </Box>

          <Box>
            <Typography variant="caption" display="flex" alignItems="center" gap={0.5}>
              <BabyChangingStationIcon fontSize="small" /> Infants
            </Typography>
            <Box display="flex" alignItems="center">
              <IconButton onClick={() => setInfants((v) => Math.max(0, v - 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography>{infants}</Typography>
              <IconButton onClick={() => setInfants((v) => v + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>

        <Box sx={{ ml: "auto" }}>
          <IconButton
            onClick={handleSubmit}
            sx={{
              backgroundColor: "#1976d2",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#1565c0",
              },
              px: 2,
              borderRadius: 2,
            }}
          >
            <SearchIcon sx={{ mr: 1 }} />
            <Typography variant="button">Search</Typography>
          </IconButton>
        </Box>
      </Card>
    </Box>
  );
};

export default SearchFlightForm;
