import { useEffect } from 'react';
import DocumentMeta from 'react-document-meta';
import { useParams } from 'react-router';

import {
  LogEntryList,
  LogHeader,
  LogRecentItems,
  LogItems,
  LogTabList
} from '@components/collectionlog';
import { Container } from '@components/layout';
import { FlexSection } from '@components/ui';

import { fetchCollectionLog, updateActiveTab } from '@store/collectionlog/actions';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { setActiveEntry } from '@store/collectionlog/slice';
import { RootState } from '@store/store';

import entryList from '../../data/entries.json';
import Spinner from '@components/ui/Spinner';

const CollectionLog = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state: RootState) => state.collectionLog);
  const params = useParams();

  useEffect(() => {
    const username = params.username;
    const entry = params.entry;

    if (!username || state.username || state.isLoaded) {
      return;
    }
  
    dispatch(fetchCollectionLog(username, entry));
  });

  const onTabChange = (tabName: string) => {
    if (!tabName || !state.data) {
      return;
    }

    const entryName = Object.keys(state.data.tabs[tabName]).sort()[0];
    dispatch(updateActiveTab(tabName, entryName));
  }

  const onEntryChange = (entryName: string) => {
    if (!entryName) {
      return;
    }

    // Handle hiding/showing of entry list and items for mobile layout
    const logList = document.getElementById('log-list-container');
    const logItems = document.getElementById('log-items-container')
    logList?.classList.add('hidden');
    logItems?.classList.remove('hidden');

    dispatch(setActiveEntry(entryName));
  }

  const getMissingEntries = (collectionLogData: any) => {
    const loadedEntries = Object.keys(collectionLogData).map((tabName, _i) => {
      return Object.keys(collectionLogData[tabName]).map((entryName, _i) => {
        return entryName;
      });
    }).flat();

    let diff = entryList.filter((leftValue) => {
      return !loadedEntries.some((rightValue) => {
        return leftValue == rightValue;
      });
    });

    if (diff.length == 0) {
      return null;
    }

    if (diff.length > 3) {
      diff = diff.slice(0, 3);
      diff.push('and more...')
    }

    return `Missing collection log entries:\n${diff.join(', ')}`
  }

  let pageTitle = 'Collection Log';

  let meta = {
    title: pageTitle,
    property: {
      'og:title': pageTitle,
      'twitter:title': pageTitle,
    },
    auto: {
      ograph: true,
    }
  };

  if (state.data?.username) {
    meta.title = `${state.data.username} | ${pageTitle}`;
  };

  return (
    <Container bgColor='bg-primary'>
      <DocumentMeta {...meta} />
      <LogHeader />
      {state.isLoading &&
        <FlexSection
          height='h-[550px]'
          borderStyle='border-4 border-black border-t-0'
        >
          <Spinner />
        </FlexSection>
      }
      {state.isLoaded &&
        <>
        <LogTabList activeTab={state.activeTab} onTabChangeHandler={onTabChange}/>
        <FlexSection
          height='h-[550px]'
          borderStyle='border-4 border-black border-t-0'
        >
          <LogEntryList
            activeEntry={state.activeEntry}
            activeTab={state.activeTab}
            entries={state.data?.tabs[state.activeTab as string]}
            onEntryChangeHandler={onEntryChange}
          />
          <LogItems />
        </FlexSection>
        </>
      }
      {state.isLoaded &&
        <LogRecentItems items={state.recentItems} />
      }
    </Container>
  );
}

export default CollectionLog;
