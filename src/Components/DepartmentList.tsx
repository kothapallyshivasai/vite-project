import React, { useState } from 'react';
import { List, ListItem, Collapse, FormControlLabel, Checkbox, Card, CardContent, Typography } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const DepartmentList: React.FC = () => {
  const [category1, setCategory1] = useState([false, false]);
  const [category2, setCategory2] = useState([false, false, false]);

  const [open, setOpen] = useState<{ [key: string]: boolean }>({
    customer_service: false,
    design: false,
  });

  const handleClick = (department: string) => {
    setOpen({ ...open, [department]: !open[department] });
  };

  const handleParentChange = (event: React.ChangeEvent<HTMLInputElement>, category: string) => {
    const isChecked = event.target.checked;
    if (category === 'category1') {
      setCategory1([isChecked, isChecked]);
    } 
    else if (category === 'category2') {
      setCategory2([isChecked, isChecked, isChecked]);
    }
  };

  const handleChildChange = (index: number, category: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    if (category === 'category1') {
      const newCategory1 = [...category1];
      newCategory1[index] = isChecked;
      setCategory1(newCategory1);
    } 
    else if (category === 'category2') {
      const newCategory2 = [...category2];
      newCategory2[index] = isChecked;
      setCategory2(newCategory2);
    }
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Departments
        </Typography>
        <List>
          <ListItem onClick={() => handleClick('customer_service')}>
            <FormControlLabel
              label="customer_service (2)"
              control={
                <Checkbox
                  checked={category1.every(Boolean)}
                  indeterminate={category1.some(Boolean) && !category1.every(Boolean)}
                  onChange={(e) => handleParentChange(e, 'category1')}
                />
              }
            />
            {open['customer_service'] ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open['customer_service']} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem>
                <FormControlLabel
                  sx={{ pl: 4 }}
                  label="support"
                  control={<Checkbox checked={category1[0]} onChange={handleChildChange(0, 'category1')} />}
                />
              </ListItem>
              <ListItem>
                <FormControlLabel
                  sx={{ pl: 4 }}
                  label="customer_success"
                  control={<Checkbox checked={category1[1]} onChange={handleChildChange(1, 'category1')} />}
                />
              </ListItem>
            </List>
          </Collapse>

          <ListItem onClick={() => handleClick('design')}>
            <FormControlLabel
              label="design (3)"
              control={
                <Checkbox
                  checked={category2.every(Boolean)}
                  indeterminate={category2.some(Boolean) && !category2.every(Boolean)}
                  onChange={(e) => handleParentChange(e, 'category2')}
                />
              }
            />
            {open['design'] ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open['design']} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem>
                <FormControlLabel
                  sx={{ pl: 4 }}
                  label="graphic_design"
                  control={<Checkbox checked={category2[0]} onChange={handleChildChange(0, 'category2')} />}
                />
              </ListItem>
              <ListItem>
                <FormControlLabel
                  sx={{ pl: 4 }}
                  label="product_design"
                  control={<Checkbox checked={category2[1]} onChange={handleChildChange(1, 'category2')} />}
                />
              </ListItem>
              <ListItem>
                <FormControlLabel
                  sx={{ pl: 4 }}
                  label="web_design"
                  control={<Checkbox checked={category2[2]} onChange={handleChildChange(2, 'category2')} />}
                />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </CardContent>
    </Card>
  );
};

export default DepartmentList;