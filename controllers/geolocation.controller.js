import { v4 as uuidv4 } from 'uuid';
import {Path} from '../models/geolocation.model.js';
import { ApiError } from '../utils/ApiError.js';
import {Project} from '../models/project.model.js';


export const createPath = async (req, res) => {
    try {
        const { projectId, totalpath, completedPath, timestamp, distance } = req.body;

        if (!projectId || !totalpath || !completedPath || !timestamp) {
            return res.status(400).json({ error: 'All required fields must be provided' });
        }

        // Validate each list in totalpath
        for (const path of totalpath) {
            if (!path._id) {
                path._id = uuidv4();
            }
            if (!path.points) {
                path.points = [];
            }
            for (const point of path.points) {
                if (typeof point.lat !== 'number' || typeof point.lng !== 'number') {
                    return res.status(400).json({ error: 'Invalid coordinates in totalpath' });
                }
            }
        }

        // Validate each list in completedPath
        for (const path of completedPath) {
            if (!path._id) {
                path._id = uuidv4();
            }
            if (!path.points) {
                path.points = [];
            }
            for (const point of path.points) {
                if (typeof point.lat !== 'number' || typeof point.lng !== 'number') {
                    return res.status(400).json({ error: 'Invalid coordinates in completedPath' });
                }
            }
        }

        const newPath = new Path({
            uuid: uuidv4(),
            projectId,
            totalpath,
            completedPath,
            timestamp,
            distance
        });

        await newPath.save();
        res.status(201).json(newPath);
    } catch (error) {
        console.error('Error creating path:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

export const getPathById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw new ApiError(400, "Path ID is required");
        }

        const path = await Path.findOne({ projectId: id });

        if (!path) {
            throw new ApiError(404, "Path not found");
        }

        res.status(200).json({ path });
    } catch (error) {
        console.error('Error getting path:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};


export const updatePath = async (req, res) => {
    try {
        const { id } = req.params;
        const { totalpath, completedPath } = req.body;

        if (!id) {
            return res.status(400).json({ error: 'Path ID is required' });
        }

        const path = await Path.findOne({ projectId: id });

        if (!path) {
            return res.status(404).json({ error: 'Path not found' });
        }

        // Push new locations into totalpath
        if (totalpath) {
            for (const newPath of totalpath) {
                const existingPath = path.totalpath.find(p => p._id === newPath._id);
                if (existingPath) {
                    existingPath.points.push(...newPath.points);
                } else {
                    path.totalpath.push(newPath);
                }
            }
        }

        // Push new locations into completedPath
        if (completedPath) {
            for (const newPath of completedPath) {
                const existingPath = path.completedPath.find(p => p._id === newPath._id);
                if (existingPath) {
                    existingPath.points.push(...newPath.points);
                } else {
                    path.completedPath.push(newPath);
                }
            }
        }

        await path.save();
        res.status(200).json(path);
    } catch (error) {
        console.error('Error updating path:', error);
        res.status(500).json({ error: 'Server error' });
    }
};