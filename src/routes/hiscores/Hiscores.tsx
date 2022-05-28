import { useEffect } from 'react';
import DocumentMeta from 'react-document-meta';

import { HiscoresList, HiscoresNav } from '@components/hiscores';
import { Container } from '@components/layout';
import { capitalize } from '@utils/format';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { useParams } from 'react-router';
import { fetchHiscores } from '@store/hiscores/actions';
import { HiscoresType } from '@store/hiscores/slice';

const Hiscores = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.hiscores);
  const params = useParams();
  
  useEffect(() => {
    const hiscoresType = params.type as HiscoresType;
    let page = parseInt(params.page as string);
    console.log('effect page', page);
  
    if (!page) {
      page = 1;
    } 

    dispatch(fetchHiscores(hiscoresType, page, 'ALL'));
  }, [dispatch, params.type, params.page]);

  const meta = {
    title: `${capitalize(state.type ?? '')} Hiscores | Page ${state.page ?? 1}`,
  };
  return (
    <Container>
      <DocumentMeta {...meta} />
      <HiscoresNav
        pageLength={state.data?.length as number}
        showFilters={true}
        showTitle={true}
      />
      <HiscoresList page={state.page} data={state.data} />
      <HiscoresNav
        pageLength={state.data?.length as number}
        showFilters={false}
        showTitle={false}
      />
    </Container>
  );
}

export default Hiscores;
