import { useQuery } from "react-query";
import {getCategoryGroups} from '../apis/category.api'

export default () => {
  return useQuery('categoryGroup', getCategoryGroups)
}

