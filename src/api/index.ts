import { ListResponse, IPost } from '../types';

export async function getPosts({ pageParam = 0 }): Promise<ListResponse<IPost[]>> {
	const res = await fetch(
		`https://dummyjson.com/posts?limit=10&skip=${pageParam}`
	);
	const data = await res.json();
	return data;
}
