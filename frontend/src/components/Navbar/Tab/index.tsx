import { FC } from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Link, useRouteMatch } from 'react-router-dom';
import style from './style';

interface TabData {
  linkRef: string;
  name: string;
  onClick?: () => void;
}

export interface DropdownTabData extends TabData {
  dropdown?: boolean;
  links?: TabData[];
}

interface TabProps extends DropdownTabData {
  onClick(): void;
}

const useStyles = makeStyles(style);

const DropdownTab: FC<DropdownTabData> = ({ linkRef, name, links = [] }) => {
  const classes = useStyles();

  return (
    <>
      <Link to={linkRef} className={classes.tabLink}>
        <Typography className={classes.tabLinkText} variant="caption" component="span">
          {name}
        </Typography>
      </Link>
      <div className={classes.dropdownList}>
        {links.map((link) => (
          <div key={link.name} className={classes.dropdownLink}>
            <Link to={link.linkRef} className={classes.tabLink} onClick={link.onClick}>
              <Typography className={classes.tabLinkText} variant="caption" component="span">
                {link.name}
              </Typography>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

const Tab: FC<TabProps> = ({ dropdown = false, linkRef, name, onClick, links }) => {
  const active = useRouteMatch({
    path: linkRef,
    exact: true,
  });
  const classes = useStyles();
  const tabClass = classNames(classes.tab, {
    [classes.active]: active,
    [classes.dropdown]: dropdown,
  });

  return (
    <li className={tabClass}>
      {dropdown ? (
        <DropdownTab name={name} links={links} linkRef={linkRef} />
      ) : (
        <Link to={linkRef} className={classes.tabLink} onClick={onClick}>
          <Typography className={classes.tabLinkText} variant="caption" component="span">
            {name}
          </Typography>
        </Link>
      )}
    </li>
  );
};

export default Tab;
