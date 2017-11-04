# INFSCI 2415 Information Visualization Term Project

## Project Description:

**Milestones**  
* week #7: abstract due
* week #9: proposal due
* week #12: progress report due
* week #14: in-class presentation, final paper due

The final project can be done by a group of 3-4 students. If you plan to form a larger group (four at most), please discuss your project idea with me before you submit the abstract. The total work should scale roughly with the group size.

All written reports should be submitted in PDF format.

The abstract is just a short paragraph describing: (1) the project name and member(s), (2) the problem you have chosen, (3) why the problem is interesting to you, and (4) what kind of data you plan to use.

The proposal is a more elaborate version of your abstract. It should be 300--500 words in length (~1-page write-up) describing: (1) the project title and group members, (2) the problem/topic you have chosen, (3) why the problem is interesting, (4) what your data looks like and a rough idea about how you plan to visualize the data.

The progress report should be in the same format as your final report. It will be at least one page including: (1) the project title and group members, (2) the goal of your visualization and motivation, (3) a preliminary description about your visualization design and any early results (what you have accomplished), and (4) plan for finalizing the project (what you expect to have).

In the last week of class, each group will give an ignite presentation (5 minutes each; 20 slides with each slide advancing automatically after 15 seconds). The final paper should be 4--8 pages in length following the ACM SIG format (http://www.acm.org/sigs/publications/proceedings-templates). You should describe your problem, approach, dataset, data analysis, evaluation, discussion, references, and so on, in sufficient details, and you need to show supporting evidence in tables and/or figures. You need to provide captions for all tables and figures. You should also briefly describe how each member contributes to the total work in the end of the report. The final project will be graded largely based on the final presentation and paper. Late days will not apply to the final reports.

## Topics:

### Project Tycho

Generate visualizations for exploring the epidemiological data from Project Tycho [VPGJ+13]  
• Download data from Tycho: https://www.tycho.pitt.edu/data/level1.php  
• Read the paper [VPGJ+1] to understand what information is included in the dataset. Skim the paper [MSvPF14] to get an idea about what could be interesting to show.  
• Potential task: Design and implement a visualization system for users to explore the dataset. You may conduct a pilot user study to understand whether your design works or not.

### Reference and Design
https://bl.ocks.org/kerryrodden/7090426
第一个图是折线图，横坐标是年份，纵坐标是死亡人数，一共有51个折线，旁边有一个下拉选择框，可以选择特定的病毒种类。
需要注意的情况：
1.清晰的把线标出来
2.每条线5年／10年标出notation

第二个图是tree图（https://bl.ocks.org/kerryrodden/7090426）大的环形有三层，第一层是美国的地区：东北，西南，西北，岛屿等，第二层是位于这个方位的州，第三层是该州的疾病类型。
需要注意的情况：
在圆环中间需要加备注,备注某一种病在州内的百分比（需要计算某种疾病的百分比）

第三个图是地图～（谢静然说他能自己解决，还能预处理差值，把city坐标经纬度带入就好了）

可能做的图：node -link反应relationship
barchar， 和tree做的差不多，二选一就可以了

### data
数据已经处理完了，data_year.json的结构为:  
 	disease : ["year":int,"state",str,"cases":int,"rate":float]  
data_week.csv:为原始数据分割出两列，year和week  
以后若有其他需要添加的数据一律放在data文件夹下  
see google drive https://drive.google.com/drive/folders/0B3YIF4fcqxtkSnBwck1vendtWnc?usp=sharing
