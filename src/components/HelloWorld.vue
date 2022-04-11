<template>
  <b-container fluid>
    <b-row>
      <b-col cols="12" md="6" sm="12" xs="12">
        <h2>Registro de usuario</h2>
      </b-col>
    </b-row>
    <b-row>
      <b-col col lg="6" md="6" sm="12" fluid="sm">
        <b-form-group
          id="fieldset-horizontal"
          label-cols-sm="3"
          label-cols-lg="3"
          content-cols-sm
          content-cols-lg="4"
          description="Fecha de nacimiento yyyy-mm-dd"
          label="Fecha de nacimiento:"
          label-for="input-horizontal"
        >
          <b-form-input
            id="input-horizontal"
            v-model="fecha_nacimiento"
          ></b-form-input>
        </b-form-group>
      </b-col>
      <b-col col lg="6" md="6" sm="12">
        <b-form-group
          id="fieldset-horizontal"
          label-cols-sm="3"
          label-cols-lg="3"
          content-cols-sm
          content-cols-lg="7"
          description="Seleccione la dependencia"
          label="Dependencia:"
          label-for="input-horizontal"
        >
          <b-form-select
            v-model="dependencia"
            :options="options"
          ></b-form-select>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <b-form-group label="Perfiles:" v-slot="{ ariaDescribedby }">
          <b-form-checkbox-group
            id="checkbox-group-1"
            v-model="selectedProfiles"
            :options="Profiles"
            :aria-describedby="ariaDescribedby"
            name="flavour-1"
          ></b-form-checkbox-group>
        </b-form-group>
      </b-col>
    </b-row>
    <hr />
    <b-row>
      <b-col cols="12">
        <h2>Definicion de tareas</h2>
      </b-col>
    </b-row>
    <b-row>
      <b-col col lg="4" md="4" sm="12">
        <b-form-group
          id="fieldset-horizontal"
          label-cols-sm="3"
          label-cols-lg="3"
          content-cols-sm
          content-cols-lg="7"
          description="Ingrese el nombre de la tarea"
          label="Tarea:"
          label-for="input-horizontal"
        >
          <b-form-input
            id="input-horizontal"
            v-model="toDo.nombre"
          ></b-form-input>
        </b-form-group>
      </b-col>
      <b-col col lg="4" md="4" sm="12">
        <b-form-group
          id="fieldset-horizontal"
          label-cols-sm="3"
          label-cols-lg="3"
          content-cols-sm
          content-cols-lg="7"
          description="Ingrese la duración de la tarea"
          label="Duración:"
          label-for="input-horizontal"
        >
          <b-form-input
            id="input-horizontal"
            v-model="toDo.duracion"
          ></b-form-input>
        </b-form-group>
      </b-col>
      <b-col col lg="2" md="2" sm="3">
        <b-button variant="outline-info" size="sm" @click="addToDo"
          >Add tarea</b-button
        >
      </b-col>
      <b-col col lg="2" md="2" sm="3">
        <b-button variant="outline-danger" size="sm" @click="cleanToDo"
          >Limpiar tareas</b-button
        >
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <b-row class="justify-content-center">
          <b-col col lg="6" md="8" sm="12">
            <b-table
              small
              responsive="sm"
              striped
              hover
              :items="items"
              :fields="fields"
              caption-top
            >
              <template #cell(Eliminar)="row">
                <b-button
                  variant="outline-danger"
                  size="sm"
                  class="mr-2"
                  @click="deleteToDo(row.item.Tarea, row.item.id)"
                  >Eliminar</b-button
                >
              </template>
              <template #table-caption>Lista de tareas por asignar.</template>
            </b-table>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row>
      <b-col col lg="2" md="4" sm="3">
        <b-button variant="outline-info" size="sm" @click="saveUser"
          >Guardar Datos</b-button
        >
      </b-col>
      <b-col col lg="2" md="4" sm="3">
        <b-button variant="outline-danger" size="sm" @click="cancel"
          >Cancelar</b-button
        >
      </b-col>
    </b-row>
    <hr />
    <b-row>
      <b-col>
        <h2>Lista de usuarios</h2>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <b-table
          responsive
          striped
          hover
          :items="itemsUsers"
          :fields="fieldsUser"
        >
          <template #cell(Activo)="row">
            <b-form-checkbox
              v-model="row.item.Activo"
              @change="setStatus(row.item)"
              value="true"
              unchecked-value="false"
              class="text-center"
            >
            </b-form-checkbox>
          </template>
          <template #cell(Editar)="row">
            <b-button
              variant="outline-primary"
              size="sm"
              class="mr-2"
              @click="udpateUser(row.item.Id)"
              >Editar</b-button
            >
          </template>
          <template #cell(Eliminar)="row">
            <b-button
              variant="outline-danger"
              size="sm"
              class="mr-2"
              @click="deleteUser(row.item.Id)"
              >Eliminar</b-button
            >
          </template>
        </b-table>
      </b-col>
    </b-row>
    <br />
  </b-container>
</template>

<script>
import axios from "axios";
const url = "https://api-dev-java.herokuapp.com";

export default {
  name: "HelloWorld",
  created() {
    this.getConf();
    this.getUsers();
  },
  props: {
    msg: String,
  },
  data() {
    return {
      fecha_nacimiento: "",
      dependencia: null,
      selectedProfiles: [],
      options: [{ value: null, text: "Seleccione.." }],
      Profiles: [],
      fields: ["Tarea", "Duracion", "Eliminar"],
      items: [],
      fieldsUser: [
        "Id",
        "FechaNacimiento",
        "Activo",
        "Dependencia",
        "Perfiles",
        "Editar",
        "Eliminar",
      ],
      itemsUsers: [],
      toDo: {
        nombre: "",
        duracion: 0,
      },
      requestUserSave: {
        id: "",
        fechaNacimiento: "",
        activo: true,
        dependencia: "",
        perfiles: [],
        filas: [],
      },
      dataUserUpdate: [],
      statusUser: true,
    };
  },
  methods: {
    getConf() {
      axios
        .get(url + "/profile")
        .then((res) => {
          res.data.map((x) => {
            this.Profiles.push({ value: x, text: x });
          });
        })
        .catch((err) => {
          console.log(err.data);
        });
      axios
        .get(url + "/dependence")
        .then((res) => {
          res.data.map((x) => {
            this.options.push({ value: x, text: x });
          });
        })
        .catch((err) => {
          console.log(err.data);
        });
    },
    getUsers() {
      this.itemsUsers = [];
      axios
        .get(url + "/all")
        .then((res) => {
          res.data.map((x) => {
            this.itemsUsers.push({
              Id: x.id,
              FechaNacimiento: x.fechaNacimiento.substr(0, 10),
              Activo: x.activo,
              Dependencia: x.dependencia,
              Perfiles: x.perfiles,
            });
          });
        })
        .catch((err) => {
          console.log(err.data);
        });
    },
    addToDo() {
      if (this.toDo.nombre === "" && this.toDo.duracion === 0)
        this.$toastr.warning(
          "Ingrese el nombre y la duracion de la tarea",
          "Mensaje"
        );
      else if (this.toDo.nombre === "")
        this.$toastr.warning("Ingrese el nombre de la tarea", "Mensaje");
      else if (this.toDo.duracion === 0)
        this.$toastr.warning("Ingrese la duracion de la tarea", "Mensaje");
      else {
        this.items.push({
          id: "",
          Tarea: this.toDo.nombre,
          Duracion: this.toDo.duracion,
        });
        this.toDo.nombre = "";
        this.toDo.duracion = 0;
      }
    },
    cleanToDo() {
      this.toDo.nombre = "";
      this.toDo.duracion = 0;
      this.items = [];
    },
    deleteToDo(toDoNombre, toDoId) {
      if (toDoId != "") this.items = this.items.filter((x) => x.id != toDoId);
      else this.items = this.items.filter((x) => x.Tarea != toDoNombre);
    },
    saveUser() {
      this.requestUserSave.fechaNacimiento = this.fecha_nacimiento;
      this.requestUserSave.dependencia = this.dependencia;
      this.selectedProfiles.map((x) => this.requestUserSave.perfiles.push(x));
      this.items.map((x) => {
        if (x.id != "")
          this.requestUserSave.filas.push({
            id: x.id,
            tarea: {
              id: x.id,
              nombre: x.Tarea,
            },
            duracion: x.Duracion,
          });
        else
          this.requestUserSave.filas.push({
            tarea: {
              nombre: x.Tarea,
            },
            duracion: x.Duracion,
          });
      });
      if (
        this.requestUserSave.fechaNacimiento === "" ||
        this.requestUserSave.dependencia === "" ||
        this.requestUserSave.perfiles.length === 0 ||
        this.requestUserSave.filas.length === 0
      )
        this.$toastr.error(
          "Debe ingresar los campos necesarios",
          "Campos requeridos"
        );
      else {
        axios
          .post(url + "/user/save", this.requestUserSave)
          .then((res) => {
            this.getUsers();
            this.$toastr.success("Usuario guardado correctamente", "Success");
            this.cleanToDo();
            this.clean();
            console.log(res);
          })
          .catch((err) => {
            this.$toastr.error(
              "Ha ocurrido un error al guardar el usuario",
              "Error"
            );
            this.clean();
            console.log(err.data);
          });
      }
    },
    clean() {
      this.selectedProfiles = [];
      this.fecha_nacimiento = "";
      this.requestUserSave = {
        id: "",
        fechaNacimiento: "",
        activo: true,
        dependencia: "",
        perfiles: [],
        filas: [],
      };
    },
    setStatus(userUpdate) {
      axios
        .get(url + "/user/" + userUpdate.Id)
        .then((res) => {
          this.dataUserUpdate = res.data;
          this.dataUserUpdate.activo = userUpdate.Activo;
          this.requestUserSave.activo = userUpdate.Activo;
          axios
            .post(url + "/user/save", this.dataUserUpdate)
            .then((res) => {
              this.$toastr.success(
                "Estado modificado correctamente",
                "Mensaje"
              );
              console.log(res.data);
            })
            .catch((err) => {
              console.log(
                "Error en actualizar el estado del usuario: " + err.data
              );
            });
        })
        .catch((err) => {
          console.log("Error en la consulta de usuario por id. " + err.data);
        });
    },
    deleteUser(id) {
      axios
        .delete(url + "/user/delete/" + id)
        .then((res) => {
          if (res) {
            this.$toastr.success("Usuario elimiando", "Success");
            this.getUsers();
          } else this.$toastr.info("Usuario no elimiando", "Info");
        })
        .catch((err) => {
          this.$toastr.error(
            "Ha ocurrido un error y no se ha podido eliminar el usuario",
            "Error"
          );
          console.log(err.data);
        });
    },
    udpateUser(id) {
      this.clean();
      axios
        .get(url + "/user/" + id)
        .then((res) => {
          this.requestUserSave.id = id;
          this.requestUserSave.activo = res.data.activo;
          this.dataUserUpdate = res.data;
          this.fecha_nacimiento = this.dataUserUpdate.fechaNacimiento.substr(
            0,
            10
          );
          this.dependencia = this.dataUserUpdate.dependencia;
          this.selectedProfiles = this.dataUserUpdate.perfiles;
          this.items = [];
          this.dataUserUpdate.filas.map((x) => {
            this.items.push({
              id: x.id,
              Tarea: x.tarea.nombre,
              Duracion: x.duracion,
            });
          });
          console.log(this.dataUserUpdate);
        })
        .catch((err) => {
          console.log("Error en la consulta de usuario por id: " + err.data);
        });
    },
    cancel() {
      this.cleanToDo();
      this.clean();
    },
  },
};
</script>


