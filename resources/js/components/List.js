import {Component} from 'react';

class List extends Component {
    render() {
        return (
            <div>
                <ul className="list-group mt-3">
                    {
                        this.props.dir.map((item, index) =>
                            (<li className="list-group-item" key={item.id}>{item.name} - {item.tel} <span
                                className="float-right">
                                <button
                                    className="btn btn-success btn-sm mr-2"
                                    onClick={(e) => this.props.view(item, e)}
                                >View</button>
                                <button
                                    className="btn btn-warning btn-sm mr-2"
                                    onClick={(e) => this.props.edit(index, e)}
                                >Edit</button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={(e) => this.props.delete(item.id, e)}
                                >Delete</button>
                            </span></li>)
                        )
                    }
                </ul>
            </div>
        )
    }

}

export default List;
