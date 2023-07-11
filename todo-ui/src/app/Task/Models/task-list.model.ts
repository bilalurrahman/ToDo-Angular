export interface TasksEntity extends EntityBase {
    title: string;
    description: string;
    status: number;
    dueDate?: string;
    haveReminder: boolean;
    reminderDateTime?: string;
    isNotifiedForReminder: boolean;
    isPinned: boolean;
    isNotifiedForDue: boolean;
    subTasks: SubTasks[];
}

export interface EntityBase {
    id: string;
    createdBy: string;
    lastModifiedBy: string;
    createdDate?: string;
    lastModifiedDate?: string;
    isActive: boolean;
    userId: number;
    isCompleted: boolean;
    isDeleted: boolean;
}

export interface SubTasks extends EntityBase {
    description: string;
}