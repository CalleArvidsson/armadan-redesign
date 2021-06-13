import { FC } from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Tab, { DropdownTabData } from '../Tab';
import style from './style';

interface TabFiller {
  filler: boolean;
}

interface Props {
  menuOpen: boolean;
  tabs: (DropdownTabData | TabFiller)[];
  onTabClick(): void;
}

function isFiller(tab: TabFiller | DropdownTabData): tab is TabFiller {
  return (tab as TabFiller).filler;
}

const useStyles = makeStyles(style);

const TabList: FC<Props> = ({ menuOpen, tabs, onTabClick }) => {
  const classes = useStyles();
  const listClass = classNames(classes.tabList, {
    [classes.open]: menuOpen,
  });

  return (
    <div className={listClass}>
      <ul>
        {tabs.map((tab) => {
          if (isFiller(tab)) {
            return <li key="tab-filler" className={classes.filler} />;
          }

          return <Tab key={tab.name} onClick={onTabClick} {...tab} />;
        })}
      </ul>
    </div>
  );
};

export default TabList;
