import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import List from "./List";

class Directory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dir: [],
            item: {
                name: "",
                tel: ""
            },
            isEditing: false,
            temp_id: null
        }

        this.add = this.add.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.delete = this.delete.bind(this)
        this.edit = this.edit.bind(this)
        this.update = this.update.bind(this)
        this.fetchAll = this.fetchAll.bind(this)
    }


    componentDidMount() {
        this.fetchAll()
    }


    fetchAll() {
        axios.get('api/tel')
            .then(res => {
                this.setState({dir: res.data})
            })
    }


    add(e) {
        e.preventDefault();
        axios.post('api/tel', this.state.item)
            .then(res => {
                this.setState({
                    item: {
                        name: "",
                        tel: ""
                    }
                })
                this.fetchAll()
            })
    }

    view(item) {
        alert(
            `
            Name = ${item.name}\n
            Tel = ${item.tel}
            `
        )
    }

    edit(id) {
        let item = this.state.dir[id]
        this.setState({isEditing: true, item: item, temp_id: item.id})
    }

    update(e) {
        e.preventDefault();
        axios.put(`api/tel/${this.state.temp_id}`, this.state.item)
            .then(res => {
                this.setState({
                    item: {
                        name: "",
                        tel: ""
                    },
                    isEditing: false,
                    temp_id: null
                })
                this.fetchAll()
            })
    }

    delete(id) {
        axios.delete(`api/tel/${id}`)
            .then(res => {
                this.fetchAll()
            })
    }

    handleChange(event) {
        const name = event.target.name
        const value = event.target.value
        let item = this.state.item;
        item[name] = value;
        this.setState({item: item});
    }

    render() {
        return (
            <div className="col-md-6">
                <form onSubmit={this.state.isEditing ? this.update : this.add} method="POST">
                    <div className="mb-2">
                        <input type="text"
                               name="name"
                               className="form-control"
                               placeholder="Enter Name"
                               value={this.state.item.name}
                               onChange={this.handleChange}/>
                    </div>
                    <div className="mb-2">
                        <input type="text"
                               name="tel"
                               className="form-control"
                               placeholder="Enter Phone"
                               value={this.state.item.tel}
                               onChange={this.handleChange}/>
                    </div>
                    <input
                        type="submit"
                        className="btn btn-success"
                        value={this.state.isEditing ? "Update" : "Save"}/>
                </form>
                <List
                    dir={this.state.dir}
                    delete={this.delete}
                    edit={this.edit}
                    view={this.view}
                />
            </div>
        )
    }
}

export default Directory;

if (document.getElementById('app')) {
    ReactDOM.render(<Directory/>, document.getElementById('app'));
}
