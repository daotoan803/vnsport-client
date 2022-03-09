import React, { useState } from 'react';

import { Box, IconButton, Collapse, List } from '@mui/material';

import CategoryIcon from '@mui/icons-material/Category';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import SideBarItem from '../SideBarItem';
import SideBarLink from './../../../navigation/SideBarLink';

import useCategoryGroups from '../../../../hooks/useCategoryGroups';

const CategoryNavigation = () => {
  const { status, data } = useCategoryGroups();
  const [expanded, setExpanded] = useState(null);
  const [expandCategoryMenu, setExpandCategoryMenu] = useState(false);

  if (status === 'loading') {
    return <div>...loading</div>;
  }

  if (status === 'error') {
    return <div>Cannot load category group</div>;
  }

  const expandCategoryGroup = (identity) => {
    if (identity === expanded) return setExpanded(null);
    setExpanded(identity);
  };

  const { data: categoryGroups } = data;
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
              <SideBarLink
                to={`/products/${group.code}?page=1`}
                state={{ categoryGroupId: group.id }}>
                <SideBarItem
                  text={group.name}
                  endIcon={
                    <IconButton
                      size="large"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        expandCategoryGroup(group.id);
                      }}>
                      {expanded !== group.id ? (
                        <ExpandMoreIcon />
                      ) : (
                        <ExpandLessIcon />
                      )}
                    </IconButton>
                  }
                />
              </SideBarLink>
              <Collapse in={expanded === group.id} unmountOnExit>
                <List sx={{ pl: 2 }}>
                  {group.categories.map((category) => (
                    <SideBarLink
                      to={`/products/${group.code}/${category.code}?page=1`}
                      state={{ categoryId: category.id }}
                      key={category.id}>
                      <SideBarItem text={category.name} />
                    </SideBarLink>
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
