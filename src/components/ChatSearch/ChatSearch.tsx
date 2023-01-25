import React, { useState, ChangeEvent, useRef, useEffect, useContext, useCallback } from 'react';
import TextAreaWithAdorment from '../TextAreaWithAdorment/TextAreaWithAdorment';
import ClearIcon from '@mui/icons-material/Clear';
import { Grid } from '@mui/material';
import { UserNickName, UserOpenData } from '../../DataTypes/User/User.D';
import AppContext from '../AppContext/AppContext';
import LinearProgress from '@mui/material/LinearProgress';
import Collapse from '@mui/material/Collapse';
import { TransitionGroup } from 'react-transition-group';
import ChatSearchUserBadge from '../ChatSearchUserBadge/ChatSearchUserBadge';

// interface ChatSearchI {
//   setChatSearchActivity: (newVal: boolean) => void;
// }

const ChatSearch = () => {
  const {
    chatService: { createNewChat },
    userService: { getUsers },
  } = useContext(AppContext);
  const [nickNameQuery, setNickNameQuery] = useState<UserNickName>('');
  const [searchResults, setSearchResults] = useState<UserOpenData[]>([] as UserOpenData[]);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
  // init trigger to uderstand what component to show
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
  const searchTimeoutRef = useRef<null | NodeJS.Timeout>(null);
  
  const setChatSearchActivity = useCallback((newVal: boolean) => {
    if (newVal === isSearchActive) return;
    setIsSearchActive(newVal);
  }, [isSearchActive]);
  
  /**
   * Make request to search by using user serice
   */
  const initSearchByNickName = useCallback(
    (query: UserNickName) => {
      const users = getUsers({ query: { userNickName: nickNameQuery } });
      setIsLoadingData(false);
      if (Array.isArray(users)) setSearchResults(users);
    },
    [getUsers, nickNameQuery],
  );

  /**
   * Logic to abort all work with ChatSearch and set it default values
   */
  const abortSearch = useCallback(() => {
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    if (nickNameQuery.length) setNickNameQuery('');
    searchTimeoutRef.current = null;
    if (searchResults.length) setSearchResults([]);
    if (isLoadingData) setIsLoadingData(false);
    setChatSearchActivity(false);
  }, [nickNameQuery.length, searchResults.length, isLoadingData, setChatSearchActivity]);

  /**
   * Logic to controll input data from text-input
   * and init search req initSearchByNickName with delay
   */
  useEffect(() => {
    if (!nickNameQuery) {
      abortSearch();
      return;
    }
    setChatSearchActivity(true);
    if (!isLoadingData) setIsLoadingData(true);
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      initSearchByNickName(nickNameQuery);
    }, 650);

    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
      searchTimeoutRef.current = null;
    };
  }, [nickNameQuery]);

  const initNewChat = (user: UserOpenData) => {
    createNewChat(user._id);
    abortSearch();
  };

  return (
    <Grid container>
      <Grid item p={1}>
        <TextAreaWithAdorment
          label='Search by nicks'
          fieldKey='chat_search'
          value={nickNameQuery}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setNickNameQuery(e.target.value);
          }}
          actionCallBacks={[abortSearch]}>
          <ClearIcon />
        </TextAreaWithAdorment>
      </Grid>
      <TransitionGroup style={{ width: '100%' }}>
        {isLoadingData && (
          <Collapse>
            <Grid item width='100%'>
              <LinearProgress />
            </Grid>
          </Collapse>
        )}
      </TransitionGroup>
      <Grid container p={1}>
        <TransitionGroup>
          {Boolean(searchResults.length) &&
            searchResults.map((user) => (
              <Collapse key={user._id}>
                <ChatSearchUserBadge user={user} onClick={initNewChat} />
              </Collapse>
            ))}
        </TransitionGroup>
      </Grid>
    </Grid>
  );
};

export default ChatSearch;
