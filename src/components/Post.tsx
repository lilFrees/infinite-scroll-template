import type { IPost } from '../types';

function Post({ post }: { post: IPost }) {
	return (
		<div className='w-full bg-purple-100 p-5 rounded-xl flex gap-5'>
			<div>{post.id}</div>
			<div>{post.title}</div>
		</div>
	);
}

export default Post;
