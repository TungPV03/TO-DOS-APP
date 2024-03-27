import { PureComponent } from "react";

class PageList extends PureComponent{
    pageList = (numberOfTasks) => {
        const numgerOfPage = numberOfTasks%5 === 0 ? numberOfTasks/5 : numberOfTasks/5 + 1; 
        const pageArr = [];
        for(let i = 1; i<=numgerOfPage; i++){
            pageArr.push(i);
        }
        return pageArr;
    }

    render(){
        const {handleSelectPageNumber,tasks,currentPage} = this.props;
        const numberOfTask = tasks.length;
        return (
            <div className="page-list">
                <p>Page: </p>
                <select onChange={handleSelectPageNumber} value={currentPage}>
                    {this.pageList(numberOfTask).map(item =>
                        <option key={item}>{item}</option>
                    )}
                </select>
            </div>
        )
    }
}

export default PageList;