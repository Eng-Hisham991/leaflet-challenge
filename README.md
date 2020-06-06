# Leaflet Homework - Visualizing Data with Leaflet

## Background


![1-Logo](Images/1-Logo.png)


The United States Geological Survey, or USGS for short, is the main provider for scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

This project builds a series of tools that will allow visualization of earthquake and tectonic data. They collect a massive amount of data from all over the world each day, this project provides a powerful way to display it.

Repository Structure:

 - This repository is named a leaflet-challenge.

 - Two folders correspond to the challenges: Leaflet-Step-1 and Leaflet-Step-2.

This project work utilizes both html and Javascript. These will be the main files to run for analysis.

## Project Tasks

### Level 1: Basic Visualization

![2-BasicMap](Images/2-BasicMap.png)

Your first task is to visualize an earthquake data set.

The steps to be followed are:

1. Get your data set

![3-Data](Images/3-Data.png)

The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visit the USGS GeoJSON feed page (http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) and pick a data set to visualize. When you click on a data set, for example 'All Earthquakes from the Past 7 Days', you will be given a JSON representation of that data. You will be using the URL of this JSON to pull in the data for our visualization.

![4-JSON](Images/4-JSON.png)

2. Import & Visualize the Data

Create a map using Leaflet that plots all of the earthquakes from your data set based on their longitude and latitude.

The data markers reflect the magnitude of the earthquake in their size and color. Earthquakes with higher magnitudes appear larger and darker in color.

Popups which provides additional information about the earthquake when a marker is clicked.

The legend provides context for the map data.

The visualization looks like the map above.

### Level 2: More Data (Optional)

![5-Advanced](Images/5-Advanced.png)

This portion of work plots a second data set on your map to illustrate the relationship between tectonic plates and seismic activity, pulling in a second data set and visualize it along side the original set of data. Data on tectonic plates can be found at (https://github.com/fraxen/tectonicplates).

The steps to be followed are:

Plots a second data set on the map.

Adds a number of base maps to choose from as well as separate out the two different data sets into overlays that can be turned on and off independently.

Adds layer controls to the map.

Copyright
Hisham Elhassan © 2020. All Rights Reserved.