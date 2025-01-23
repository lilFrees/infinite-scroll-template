export interface IPost {
	id: number;
	title: string;
	body: string;
	tags: string[];
	reactions: Reaction[];
	views: number;
	userId: number;
}

export interface Reaction {
	likes: number;
	dislikes: number;
}

export type ListResponse<T> = {
	posts: T;
	total: number;
	skip: number;
	limit: number;
};
