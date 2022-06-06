import { AppDispatch } from '@store/store';
import { updateUrl } from '@utils/components';
import { CollectionLogAPI } from 'src/api/CollectionLogAPI';
import { HiscoresType, setData, setFilter, setPage, setType } from './slice';

export const fetchHiscores = (type: HiscoresType, page: number, filter: string) => {
  return async(dispatch: AppDispatch) => {
    dispatch(setFilter(filter));
    dispatch(setPage(page));
    dispatch(setType(type));

    const api = new CollectionLogAPI();
    const res = await api.getHiscores(type, page, filter);

    if (res.data.error) {
      return;
    }

    dispatch(setData(res.data));
    
    updateUrl(`/hiscores/${type}/${page}`);
  }
}
