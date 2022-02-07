import React, { useState, useEffect } from 'react';

import RouterLink from '../navigation/RouterLink';

import categoryApi from './../../apis/category';

import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Box,
  Grow,
  IconButton,
  Collapse,
  List,
} from '@mui/material';

import CategoryIcon from '@mui/icons-material/Category';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import SideBarItem from './SideBarItem';

const CategoryNavigation = () => {
  const [categoryGroups, setCategoryGroups] = useState([]);

  const [expanded, setExpanded] = useState(null);
  const [expandCategoryMenu, setExpandCategoryMenu] = useState(false);

  useEffect(() => {
    categoryApi.getCategoryGroups().then(({ data }) => {
      setCategoryGroups(data);
    });
  }, []);

  const expandCategoryGroup = (identity) => {
    if (identity === expanded) return setExpanded(null);
    setExpanded(identity);
  };

  return (
    <>
      <SideBarItem
        onClick={() => setExpandCategoryMenu(!expandCategoryMenu)}
        startIcon={<CategoryIcon />}
        text="Danh mục sản phẩm"
        endIcon={!expandCategoryMenu ? <ExpandMoreIcon /> : <ExpandLessIcon />}
      />
      <Collapse in={expandCategoryMenu} unmountOnExit>
        <List sx={{ pl: 1 }}>
          {categoryGroups.map((group) => (
            <Box key={group.id}>
              <SideBarItem
                onClick={() => expandCategoryGroup(group.id)}
                text={group.name}
                endIcon={
                  expanded !== group.id ? (
                    <ExpandMoreIcon />
                  ) : (
                    <ExpandLessIcon />
                  )
                }
              />
              <Collapse in={expanded === group.id} unmountOnExit>
                <List sx={{ pl: 2 }}>
                  {group.categories.map((category) => (
                    <SideBarItem key={category.id} text={category.name} />
                  ))}
                </List>
              </Collapse>
            </Box>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default CategoryNavigation;
