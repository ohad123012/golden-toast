import { FC } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { Combobox } from '@headlessui/react';
export const SearchBar: FC = () => {
  return (
    <div>
      <Autocomplete
        options={[{ name: 'aa' }, { name: 'bb' }]}
        getOptionLabel={({ name }) => name}
        sx={{ padding: '1rem' }}
        renderInput={(params) => <TextField {...params} label="toasts" />}
      />
    </div>
  );
};
