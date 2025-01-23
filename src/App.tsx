import { getPosts } from './api';

import { useInfiniteQuery } from 'react-query';
import { IPost, ListResponse } from './types';
import Post from './components/Post';
import { useCallback, useEffect, useRef } from 'react';

export default function App() {
	const { data, fetchNextPage } = useInfiniteQuery<ListResponse<IPost[]>>(
		'posts',
		getPosts,
		{
			getNextPageParam: (lastPage) => {
				if (lastPage.total === lastPage.skip) return undefined;
				return lastPage.skip + lastPage.limit;
			},
		}
	);

	console.log(data, 'data');

	const posts = data?.pages.flatMap((page) => page.posts) ?? [];

	const lastPostRef = useRef<HTMLDivElement | null>(null);

	const observerRef = useRef<IntersectionObserver | null>(null);

	useEffect(() => {
		observerRef.current = new IntersectionObserver(
			(entries) => {
				const [entry] = entries;

				if (entry.isIntersecting) {
					fetchNextPage();
				}
			},
			{
				threshold: 1,
			}
		);

		return () => observerRef.current?.disconnect();
	}, [fetchNextPage]);

	const setLastPostRef = useCallback((node: HTMLDivElement | null) => {
		if (lastPostRef.current) {
			observerRef.current?.unobserve(lastPostRef.current);
		}

		if (node) {
			observerRef.current?.observe(node);
		}

		lastPostRef.current = node;
	}, []);

	return (
		<div className='max-w-3xl mx-auto w-full relative mt-32 '>
			<h1 className='text-2xl font-bold mb-10 fixed top-0'>HEeeeeee</h1>

			<div className='border-slate-700 border-4 '>
				<div className='flex flex-col-reverse gap-5 overflow-auto p-2 h-[500px]'>
					{posts.map((post, i) => {
						if (i === posts.length - 1)
							return (
								<div ref={setLastPostRef} key={post.id}>
									<Post post={post} />
								</div>
							);
						return <Post post={post} key={post.id} />;
					})}
				</div>
			</div>
			<button
				onClick={() => fetchNextPage()}
				className='px-5 py-2 bg-slate-300 rounded-xl mt-5 hover:bg-slate-200 transition-all'
			>
				Load more...
			</button>
		</div>
	);
}
