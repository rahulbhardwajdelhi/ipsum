const requireEnv = (name: string) => {
	const value = process.env[name];

	if (!value) {
		throw new Error(`${name} is not configured`);
	}

	return value;
};

export const DATABASE_ID = requireEnv("NEXT_PUBLIC_APPWRITE_DATABASE_ID");
export const WORKSPACES_ID = requireEnv("NEXT_PUBLIC_APPWRITE_WORKSPACES_ID");
export const IMAGES_BUCKET_ID = requireEnv("NEXT_PUBLIC_APPWRITE_IMAGES_BUCKET_ID");
export const MEMBERS_ID = requireEnv("NEXT_PUBLIC_APPWRITE_MEMBERS_ID");
export const TASKS_ID = requireEnv("NEXT_PUBLIC_APPWRITE_TASKS_ID");
export const PROJECTS_ID = requireEnv("NEXT_PUBLIC_APPWRITE_PROJECTS_ID");