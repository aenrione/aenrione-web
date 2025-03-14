---
title: "Automatizando mi setup de Linux con Ansible"
date: 2025-03-13T20:08:17-03:00
draft: false
---


Como desarrollador, a menudo me encuentro trabajando en múltiples máquinas y entornos. Mantener una configuración consistente en cada una de ellas puede ser un desafío. Cada vez que accedía a una nueva máquina mediante SSH, mi entorno de desarrollo no estaba configurado como me gustaría. Para solucionar este problema, decidí automatizar la configuración de mi entorno en Ubuntu utilizando Ansible.

## ¿Qué es Ansible?

Ansible es una herramienta de automatización de código abierto que permite la gestión de configuraciones, la implementación de aplicaciones y la orquestación de tareas. Una de sus principales ventajas es que es *agentless*, es decir, no requiere la instalación de software adicional en las máquinas que administra, ya que se comunica a través de SSH.

## Organización de mis dotfiles

El primer paso fue organizar mis [*dotfiles*](https://github.com/aenrione/dotFiles), que son archivos de configuración para diversas aplicaciones y herramientas de desarrollo. Al centralizar estos archivos en un repositorio, es posible mantener un control de versiones y asegurarme de que las configuraciones fueran consistentes en todas mis máquinas.

## Creación de playbooks de Ansible

A partir de esto, procedí a crear playbooks de Ansible. Un playbook es un archivo YAML que define una serie de tareas que Ansible ejecutará en las máquinas objetivo. Estas tareas pueden incluir la instalación de paquetes, la copia de archivos de configuración y la ejecución de comandos.

En mi caso, creé un playbook que realiza las siguientes acciones:

- Instala los paquetes necesarios para mi entorno de desarrollo, como `git`, `nvim` y `tmux`.
- Copia mis *dotfiles* al directorio home del usuario.
- Configura Git con mi nombre de usuario y correo electrónico.
- Establece las configuraciones de `vim` y `tmux` según mis preferencias.

A continuación, se muestra un fragmento de mi playbook:

```yaml
---
``- name: Configure TMUX enviroment
  hosts: localhost
  become: yes
  vars:
    user_home: "{{ lookup('env', 'HOME') }}"
    user: "{{ lookup('env', 'USER') }}"
    dotfiles_directory: "{{ lookup('env', 'HOME') }}/.dotfiles"
    packages:
      - tmux
      - stow
      - tmuxinator
  tasks:
    - name: Install dependencies
      apt:
        name: "{{ packages }}"
        state: present

    - name: Clone tpm
      git:
        repo: https://github.com/tmux-plugins/tpm.git
        dest: ~/.tmux/plugins/tpm

    - name: Stow dotfiles
      shell: stow -t ~ tmux
      args:
        chdir: "{{ dotfiles_directory }}"
```


## Ejecución del playbook

Una vez definido el playbook, su ejecución es sencilla. Desde la línea de comandos, simplemente corro:

```bash
ansible-playbook my_playbook.yml --ask-become-pass
```


Ansible se encarga de ejecutar cada tarea en el orden definido, asegurando que mi entorno de desarrollo quede configurado de manera consistente en cualquier máquina.

*Nota: El flag `--ask-become-pass` solicita la contraseña de sudo para ejecutar las tareas que requieren privilegios de administrador.*

*Nota 2: En mi caso, utilizo `localhost` como host, ya que las tareas se ejecutan en la misma máquina desde la que lanzo el playbook.*

### Importaciones de otros playbooks

Para mantener mi configuración organizada y modular, he dividido mi playbook en varios archivos YAML. Por ejemplo, tengo un archivo `neovim.yml` que se encarga de configurar `vim` y otro archivo `tmux.yml` que se encarga de configurar `tmux`. Luego, en mi playbook principal, importo estos archivos de la siguiente manera:

```yaml
---
- name: Main playbook to install required tools
  hosts: localhost
  gather_facts: false

...
- import_playbook: required-tools/neovim.yml
- import_playbook: required-tools/tmux.yml
...

```

## Beneficios obtenidos

Al automatizar la configuración de mi entorno de desarrollo con Ansible, he logrado:

- **Conveniencia**: Ahora puedo configurar rápidamente cualquier máquina con mi entorno de desarrollo preferido.
- **Consistencia**: Todas mis máquinas ahora tienen la misma configuración, lo que reduce errores y comportamientos inesperados.
- **Eficiencia**: La configuración manual de cada máquina puede ser tediosa y propensa a errores. Con Ansible, este proceso se realiza de manera automática y rápida.
- **Escalabilidad**: Si necesito agregar una nueva herramienta o modificar una configuración, solo debo actualizar el playbook y ejecutar Ansible en todas mis máquinas.

## Conclusión

Ansible se ha convertido en una herramienta esencial en mi flujo de trabajo como desarrollador. Me permite mantener un entorno de desarrollo coherente y eficiente en múltiples máquinas, facilitando la gestión y actualización de mis configuraciones. Recomiendo a otros desarrolladores considerar la automatización de sus entornos utilizando herramientas como Ansible para mejorar su productividad y reducir errores.

---

*Nota: Puedes encontrar el código completo de mis playbooks y *dotFiles* en mi [repositorio de GitHub](https://github.com/aenrione/dotFiles/tree/main/ansible).*

