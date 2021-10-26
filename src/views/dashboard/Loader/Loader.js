import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export default function CircularColor() {
    return (
        <div style={{display:"flex", alignItems: "center", justifyContent: "center", marginTop: "20%"}}>
            <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                <CircularProgress color="secondary" />
            </Stack>
        </div>

    );
}
